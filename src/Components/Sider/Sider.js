import React, { Component } from "react";
import { Layout, Icon, Tooltip } from "antd";
import Logo from "./Logo.png";
import "./Sider.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Link } from "react-router-dom";

const { Sider } = Layout;
class Siders extends Component {
  state = {
    width: this.props.width
  };
  render() {
    return (
      <Sider
        trigger={null}
        collapsed={true}
        collapsedWidth={this.state.width}
        breakpoint="md"
        onBreakpoint={isbreak => {
          this.setState({ width: isbreak ? 0 : 80 });
        }}
        className="my-sider"
        style={{
          background: "linear-gradient(-154deg,#616d86,#1f1c2c)",
          boxShadow: "inset 0px 0px 100px rgba(0,21,41,.6)"
        }}
      >
        <div className="logo">
          <img src={Logo} alt="Ocp Logo" />
        </div>
        <div id="side-menu">
          <Link to="/">
            <Tooltip placement="right" title="Home">
              <div className="item">
                <Icon type="dashboard" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-menu">
          <Link to="/data">
            <Tooltip placement="right" title="Database loading">
              <div className="item">
                <Icon type="database" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-menu">
          <Link to="/users">
            <Tooltip placement="right" title="Users List">
              <div className="item">
                <Icon type="smile" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-menu">
          <Link to="/users/approval">
            <Tooltip placement="right" title="Users Approval">
              <div className="item">
                <Icon type="usergroup-add" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-menu">
          <Link to="/events">
            <Tooltip placement="right" title="Events List">
              <div className="item">
                <Icon type="exclamation-circle" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-menu">
          <Link to="/map">
            <Tooltip placement="right" title="Ports Map">
              <div className="item">
                <Icon type="compass" />
              </div>
            </Tooltip>
          </Link>
        </div>
        <div id="side-logout">
          <Icon type="logout" onClick={this.props.logout} id="s-logout" />
        </div>
      </Sider>
    );
  }
}

export default connect(null, { logout })(Siders);
