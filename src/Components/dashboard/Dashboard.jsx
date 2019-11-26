import React, { Component } from "react";
import { Row } from "antd";
import Indicators from "./Indicators";
import Stoppage from "./Stoppage";
import Quantity from "./Quantity";

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Row gutter={16}>
          <Indicators {...this.props} />
        </Row>
        <Row gutter={16}>
          <Stoppage />
        </Row>
        <br />
        <Row>
          <Quantity />
        </Row>
      </div>
    );
  }
}

export default Dashboard;
