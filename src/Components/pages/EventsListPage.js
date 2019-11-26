import React, { Component } from "react";
import AppLayout from "../Layout/Layout";
import Events from "../../Components/events/Events";

class UserApprovalPage extends Component {
  render() {
    return <AppLayout {...this.props} component={Events} />;
  }
}

export default UserApprovalPage;
