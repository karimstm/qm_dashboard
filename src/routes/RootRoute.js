import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Home from "../Components/pages/Home";
import Auth from "../Components/Auth/Auth";
import Login from "../Components/Auth/LoginForm";
import NotFound from "../Components/pages/notFound";
import { connect } from "react-redux";
import Data from "../Components/pages/Data";
import UserApprovalPage from "../Components/pages/UserApprovalPage";
import UsersListPage from "../Components/pages/UsersListPage";
import EventsListPage from "../Components/pages/EventsListPage";
import MapPage from "../Components/pages/MapPage";

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
        <Route path="/data" exact component={Data} />
        <Route path="/users" exact component={UsersListPage} />
        <Route path="/users/approval" exact component={UserApprovalPage} />
        <Route path="/events" exact component={EventsListPage} />
        <Route path="/map" exact component={MapPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(RootRoute);
