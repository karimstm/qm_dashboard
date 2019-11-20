import React, { Component } from 'react';
import AppLayout from '../Layout/Layout';
import UserApprovals from '../Users/UserApprovals';
import DataLoading from '../DataLoading/DataLoading';

class UserApprovalPage extends Component {

    render() {
        return (
            <AppLayout component={ UserApprovals } />
        );
    }
}

export default UserApprovalPage;