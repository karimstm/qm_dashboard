import React, { Component } from "react";
import UsersListTable from "./Tables/UsersListTable";
import { connect } from "react-redux";
import { fetchUsers, DisableEnableUser } from "../../actions/users";
import { openNotification, successNotifiaction } from "../NotificationMessages";
import { USERS_UPDATE_SUCCESS } from "../../actions/types";
import UserFilter from "./UserFilter";

class UsersList extends Component {
  //Fetch users
  fetchUsersList = async () => {
    const { fetchUsers } = this.props;
    await fetchUsers()
  };

  //Update User status
  EnableOrDisableUser = async (id, is_active) => {
    const { DisableEnableUser } = this.props;
    const response = await DisableEnableUser(id, is_active);
    if (response.type === USERS_UPDATE_SUCCESS) {
      successNotifiaction("User status updated");
      this.fetchUsersList();
    }
  };

  // Hnadle filters in UserFilter Component
  onSubmit = ({ is_active, first_name, last_name, email }) => {
    this.props.fetchUsers(false, is_active, email, first_name, last_name);
  };

  componentDidMount() {
    this.fetchUsersList();
  }

  render() {
    const { users, error } = this.props;

    if (error) openNotification(error);
    return (
      <div>
        <h4 style={{ marginBottom: "2%", fontWeight: "lighter" }}>
          LIST OF USERS
        </h4>
        <UserFilter onSubmit={this.onSubmit} />
        <UsersListTable
          onAction={this.EnableOrDisableUser}
          dataSource={users}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    error: state.users.error
  };
};
export default connect(mapStateToProps, { fetchUsers, DisableEnableUser })(
  UsersList
);
