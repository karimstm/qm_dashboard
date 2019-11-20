import React, { Component } from 'react';
import UsersList from '../Users/UsersList';
import AppLayout from '../Layout/Layout';

class UsersListPage extends Component {
    render() {
        return (
            <AppLayout component={ UsersList } />
        );
    }
}

export default UsersListPage;