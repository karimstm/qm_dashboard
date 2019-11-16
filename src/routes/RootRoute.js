import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Home from "../Components/pages/Home";
import Auth from "../Components/Auth/Auth";
import Login from "../Components/Auth/LoginForm";
import NotFound from "../Components/pages/notFound";
import { connect } from "react-redux";
import Data from "../Components/pages/Data";

class RootRoute extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route
          path="/login"
          exact
          render={props => <Auth {...props} component={Login} />}
        />
        <Route
          path="/data"
          exact
          component={Data} />}
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(RootRoute);
