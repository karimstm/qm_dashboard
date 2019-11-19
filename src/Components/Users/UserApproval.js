import React, { Component } from 'react';
import AppLayout from '../Layout/Layout';
import Users from './Users';



class UserApproval extends Component {
    render() {
        return (
            <AppLayout component={Users} />
        );
    }
}

export default UserApproval;