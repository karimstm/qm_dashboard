import React, { Component } from "react";
import AppLayout from "../Layout/Layout";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";

class Home extends Component {
  render() {
    if (!this.props.isAuth) return <Redirect to="/login" />;
    return <AppLayout component={<Dashboard />} />;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Home);
