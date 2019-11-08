import React, { Component } from "react";
import "./Auth.css";
import Logo from "../QmLogo.svg";
import { Layout, Col, Row } from "antd";


export default class Login extends Component {
  render() {
    return (
      <Layout className="login">
        <div className="Layer">
            <div className="auth-form">
              <div className="logo-form">
                <img src={Logo} alt="QM logo" />
              </div>
                <Row style={{ backgroundColor: '#eee' }}>
                <Col xs={{ span: 3}} md={{ span: 6 }} lg={{ span: 9 }}>
                </Col>
                <Col xs={{ span: 18}} md={{ span: 12 }} lg={{ span: 6 }}>
                  { <this.props.component/> }
                </Col>
                <Col xs={{ span: 3}} md={{ span: 6 }} lg={{ span: 9 }}>
                </Col>
                </Row>

            </div>
        </div>
      </Layout>
    );
  }
}
