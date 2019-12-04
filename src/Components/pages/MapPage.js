import React, { Component } from "react";
import AppLayout from "../Layout/Layout";
import MapIframe from "../map/MapIframe";

class UserApprovalPage extends Component {
  render() {
    return <AppLayout {...this.props} component={MapIframe} />;
  }
}

export default UserApprovalPage;
