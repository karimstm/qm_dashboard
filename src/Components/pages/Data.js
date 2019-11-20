import React, { Component } from "react";
import AppLayout from "../Layout/Layout";
import DataLoading from "../DataLoading/DataLoading";

class Data extends Component {
  render() {
    return <AppLayout component={ DataLoading } />;
  }
}

export default Data;
