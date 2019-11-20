import React, { Component } from 'react';
import ApprovalTable from './Tables/ApprovalTable';
import { connect } from 'react-redux';
import { fetchWaitingUsers, PatchUserApproval } from '../../actions/users';
import { openNotification, successNotifiaction } from '../NotificationMessages';

class UserApprovals extends Component {
    

    // Fetch Non Approved Users
    fetchWaitingUsers = async () => {
        await this.props.fetchWaitingUsers();
    }

    // Patch User Approval or dispprove
    EnableOrDisableUser = async (id, is_refused) => {
        const response = await this.props.PatchUserApproval(id, is_refused)
        if (response.status === 200 )
            successNotifiaction("User Deleted")
        if (response.status === 201 )
            successNotifiaction("User Accpeted")
    }

    componentDidMount() {
        this.fetchWaitingUsers();
    }

    render() {
        const { error, users } = this.props;
        if (error)
            openNotification(error);
        console.log(users);
        return (
            <div>
                <h4 style={{ marginBottom: '5%', fontWeight: 'lighter' }}>Users waiting for approval</h4>
                <ApprovalTable 
                    onAction={this.EnableOrDisableUser}
                    dataSource={users}
                 />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        error: state.users.error
    }
}

export default connect(mapStateToProps, {
    fetchWaitingUsers,
    PatchUserApproval
})(UserApprovals);