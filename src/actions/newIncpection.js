import axios from "axios";
import { api } from "./config";
import {
  LOADINSPECTIONS,
  ISLOADING,
  CREATION_SUCCESS,
  CREATION_FAILED
} from "./types";
import moment from "moment";
var jwt = require("jsonwebtoken");
export const CreateNew = form => dispatch => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  if (token) {
    const id = jwt.decode(token).user_id;
    // Request Body
    if (id) {
      const body = {
        which_dock: form["Quai"],
        loading_port: form["Port"],
        inspection_date: moment(),
        inspection: {
          vessel_id: form["Vessel_ID"],
          user_id: id,
          vessel_breathed: form["Vessel_Berthed"],
          vessel_arrived: form["Vessel_Arrived"]
        },
        clientloadingdetails: {
          product_id: [form["Product_ID"]],
          client_id: [form["Client_ID"]],
          origin_id: [form["Origine"]]
        }
      };
      axios
        .post(api + "requirement/", body, config)
        .then(() => {
          dispatch({ type: CREATION_SUCCESS });
          loadInspections()(dispatch);
        })
        .catch(e => {
          console.log(e.response);
          dispatch({ type: CREATION_FAILED, payload: e.response });
        });
    }
  } else dispatch({ type: CREATION_FAILED });
};

export const loadInspections = () => dispatch => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  // Headers
  if (token) {
    axios
      .get(
        api +
          "test/?inspection_status=ONHOLD,INPROGRESS&ordering=-inspection_date",
        config
      )
      .then(res => {
        var inspections = [];
        res.data.forEach(inspection => {
          let payload = {};
          payload.id = inspection["id"];
          payload.dock = inspection["dock"];
          payload.user = inspection["user"];
          payload.vessel = inspection["vessel"];
          payload.port = inspection["port"];
          payload.docks = inspection["docks"];
          payload.vessel_status = inspection["vessel_status"];
          payload.status = inspection["inspection_status"];
          payload.date = moment(inspection["inspection_date"]);
          payload.vessel_arrived = moment(inspection["vessel_arrived"]).format(
            "YYYY/MM/DD HH:mm"
          );
          payload.vessel_berthed = moment(inspection["vessel_breathed"]).format(
            "YYYY/MM/DD HH:mm"
          );
          payload.delay = moment().diff(payload.date, "hours");
          inspections.push(payload);
        });
        dispatch({ type: LOADINSPECTIONS, payload: inspections });
      })
      .catch(e => {
        console.log(e.response);
        dispatch({ type: CREATION_FAILED, payload: e.response });
      });
  } else dispatch({ type: CREATION_FAILED });
};
