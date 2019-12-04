import React, { Component } from "react";
// import { Table } from "reactstrap";
import { Table, Button } from "antd";
import axios from "axios";
import moment from "moment";
import { api } from "../../actions/config";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "Port",
    dataIndex: "port",
    key: "port"
  },
  {
    title: "Dock",
    dataIndex: "dock",
    key: "dock"
  },
  {
    title: "Vessel",
    dataIndex: "vessel",
    key: "vessel"
  },
  {
    title: "Inspector",
    dataIndex: "inspector",
    key: "inspector"
  },
  {
    title: "Event",
    dataIndex: "event",
    key: "event"
  }
];

const get_event = (data, type) => {
  switch (type) {
    case "Halt":
      return data.halt ? data.halt.halt_event : null;
    case "Incident":
      return data.incident ? data.incident.incident_event : null;
    default:
      return "";
  }
};

const get_inspector = data => {
  let first_name = data.user.first_name;
  let last_name = data.user.last_name;
  if (first_name !== null && last_name !== null) {
    return first_name.concat(" ", last_name);
  } else if (first_name !== null || last_name !== null) {
    return first_name + last_name;
  } else {
    return "";
  }
};

export class TableEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      tabLoading: false,
      datasource: [],
      type: "ONHOLD",
      related: "",
      resuming_hour: "null"
    };
    this.onFetchData = this.onFetchData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const state = this.props.history.location.state;
    if (state && state.type === "INPROGRESS") {
      this.setState(
        { tabLoading: true, type: "INPROGRESS", resuming_hour: "" },
        () => this.onFetchData()
      );
    } else if (
      state &&
      state.type === "ONHOLD" &&
      state.related === "PRODUCT"
    ) {
      this.setState(
        { tabLoading: true, type: "ONHOLD", related: "PRODUCT" },
        () => this.onFetchData()
      );
    } else if (state && state.type === "ONHOLD" && state.related === "HALT") {
      this.setState({ tabLoading: true, type: "ONHOLD", related: "HALT" }, () =>
        this.onFetchData()
      );
    } else if (
      state &&
      state.type === "ONHOLD" &&
      state.related === "WEATHER"
    ) {
      this.setState(
        { tabLoading: true, type: "ONHOLD", related: "WEATHER" },
        () => this.onFetchData()
      );
    } else {
      this.setState({ tabLoading: true, type: "ONHOLD" }, () =>
        this.onFetchData()
      );
    }
  }

  handleClick() {
    this.setState({ tabLoading: true, isLoading: true }, () =>
      this.onFetchData()
    );
  }

  onFetchData() {
    const requestURL = `${api}incidentdetails/?resuming_hour=${this.state.resuming_hour}&inspection_ref__inspection_status=${this.state.type}&related=${this.state.related}&ordering=-stopping_hour`;
    let dataSource = [];
    axios
      .get(requestURL)
      .then(res => {
        let i = 0;
        let dataLength = res.data.length;
        let data = res.data;
        let event;
        let inspector;
        let date;
        for (i; i < dataLength; i += 1) {
          date = moment(data[i].stopping_hour).format("MMM D HH:mm");
          event = get_event(data[i], data[i].halt_or_incident);
          inspector = get_inspector(data[i].inspection.user);
          dataSource.push({
            key: i + 1,
            date: date,
            port: data[i].inspection.port.name,
            dock: data[i].inspection.docks,
            vessel: data[i].inspection.vessel,
            inspector: inspector,
            event: event
          });
        }
        this.setState({
          isLoading: false,
          tabLoading: false,
          dataSource
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Button
          className="event-back"
          type="primary"
          ghost
          size="default"
          icon="arrow-left"
          onClick={() => this.props.history.goBack()}
        >
          Go Back
        </Button>
        <Button
          className="event-refresh"
          type="primary"
          ghost
          size="default"
          icon="reload"
          loading={this.state.isLoading}
          onClick={this.handleClick}
        >
          Refresh
        </Button>
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
          loading={this.state.tabLoading}
        />
      </React.Fragment>
    );
  }
}

export default TableEvent;
