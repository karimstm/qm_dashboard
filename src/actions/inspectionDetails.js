import axios from "axios";
import { api } from "./config";
import { ISLOADING, LOADINSPECTION, LOADINGFAILED, CLEARERROR } from "./types";

// var jwt = require("jsonwebtoken");
export const LoadInspection = id => dispatch => {
  dispatch({ type: ISLOADING });
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  if (token) {
    axios
      .get(api + `test/${id}`, config)
      .then(res => {
        let payload = {};
        payload.docks = res.data.docks;
        payload.foreign_inspector = res.data.foreign_inspector;
        payload.holds_filled = res.data.holds_filled;
        payload.id = res.data.id;
        payload.inspection_date = new Date(
          res.data.inspection_date
        ).toUTCString();
        payload.inspection_status = res.data.inspection_status;
        payload.port = res.data.port;
        payload.user = res.data.user;
        payload.clients = res.data.clients;
        payload.vessel = res.data.vessel;
        payload.inspection_date_end = res.data.inspection_date_end;
        payload.vessel_arrived = new Date(
          res.data.vessel_arrived
        ).toUTCString();
        payload.vessel_berthed = new Date(
          res.data.vessel_breathed
        ).toUTCString();
        payload.vessel_status = res.data.vessel_status;
        dispatch({ type: LOADINSPECTION, payload: payload });
      })
      .catch(e => {
        dispatch({ type: LOADINGFAILED, payload: "error" });
      });
  }
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEARERROR });
};

export const HourlyCheck = (form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  const body = JSON.stringify({
    inspection_ref: id,
    temperature: form["Cargo_temp"],
    humidity: form["Relative Humidity"],
    debit: form["Debit"],
    ambient_temperature: form["Ambient Temperature"],
    date: form["Date"],
    origin: form["Origine Marchandise"]
  });
  if (token) {
    axios
      .post(api + "hourlycheck/", body, config)
      .then(res => {})
      .catch(e => console.log(e.response.data));
  }
};

export const EditLoading = (form, id) => () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  const body = JSON.stringify({
    id: 1,
    nor_tendered_date: form["NOR"],
    loading_order_date: form["Ordre de Chargement"],
    loading_starting_date: form["Commenced loading"],
    loading_end_date: form["Completed loading"],
    cargo_condition: form["Conditions of Cargo"],
    uld_test_date: form["Uld test"]
  });
  if (token) {
    axios
      .patch(api + `loading/${id}/`, body, config)
      .then(() => {
        console.log("edited");
      })
      .catch(e => console.log(e.response));
  }
};

export const AddSurvey = (form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  const body = JSON.stringify({
    start_inter_draugth_surv: form["Initial"],
    end_inter_draugth_surv: form["Final"],
    loading_ref: id
  });
  if (token) {
    axios
      .post(api + `inter/`, body, config)
      .then(() => {})
      .catch(e => console.log(e.response));
  }
};
export const AddProduct = (form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  const body = JSON.stringify({
    loading_id: id,
    product: {
      name: form["Product Name"],
      productcategory: form["Product Category"]
    }
  });
  if (token) {
    console.log(body);
    axios
      .post(api + `createproduct/`, body, config)
      .then(() => {})
      .catch(e => console.log(e.response));
  }
};
export const AddClient = (form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  const body = JSON.stringify({
    loading_id: id,
    client_id: form["Client"]
  });
  if (token) {
    console.log(body);
    axios
      .post(api + `clientinsert/`, body, config)
      .then(() => {})
      .catch(e => console.log(e.response));
  }
};
export const CreateIncident = (form, id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  let body = {};
  if (form["Type"] === "Halt") {
    body = JSON.stringify({
      inspection_ref: id,
      halt_ref: form["Name"],
      incident_spec_ref: null,
      halt_or_incident: "Halt",
      stopping_hour: form["Date"],
      description: form["Description"]
    });
  } else {
    body = JSON.stringify({
      inspection_ref: id,
      halt_ref: null,
      incident_spec_ref: form["Name"],
      halt_or_incident: "Incident",
      stopping_hour: form["Date"],
      description: form["Description"]
    });
  }
  console.log(body);
  if (token) {
    console.log(body);
    axios
      .post(api + `testo/`, body, config)
      .then(() => {})
      .catch(e => console.log(e.response));
  }
};
export const ResumeIncident = (form, id, inspect_id, type) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  const body = JSON.stringify({
    id: id,
    inspection_ref: inspect_id,
    resuming_hour: form["Date"],
    qte_by_kgs: form["Quantite"],
    temperature: form["Temperatue"],
    possible_cause: form["Cause"],
    humidity_rate: form["Humidity"],
    description: form["Description"]
  });
  if (token) {
    console.log(body);
    axios
      .patch(api + `testo/`, body, config)
      .then(() => {})
      .catch(e => console.log(e.response));
  }
};
