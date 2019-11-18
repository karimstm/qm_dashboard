import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Sider from "../Sider/Sider";
import { Layout, Icon } from "antd";
import "./Layout.css";
import "../../assets/css/dashboard.css";
import SiderMenu from "../SiderMenu/SiderMenu";
import Logo from "../../Logo.png";
const { Header, Content } = Layout;

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider with={this.state.collapsed} />
        <SiderMenu onClose={this.onClose} visible={this.state.visible} />
        <Layout>
          <Header id="header">
            <Icon className="l-trigger" type="menu" onClick={this.showDrawer} />
            <div className="md-logo">
              <img src={Logo} alt="Ocp Logo" />
            </div>
            <Navbar />
          </Header>

          <Content
            style={{
              margin: "24px 16px 0 16px",
              padding: 24,
              // background: "#fff",
              background: "#f4f3ef",
              minHeight: 280
            }}
          >
            {this.props.component}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
