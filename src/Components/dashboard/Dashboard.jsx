import React, { Component } from "react";
import { Row, Col } from "antd";
import Indicators from "./Indicators";
import Stoppage from "./Stoppage";
import Quantity from "./Quantity";
import MapIframe from "./MapIframe";

class Dashboard extends Component {
  render() {
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
          <Col>
            <Quantity />
          </Col>
          <Col>
            <MapIframe />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
