import React, { Component } from 'react';
import { Card } from 'antd';
import ApprovalTable from './Tables/UsersApproval';


const { CardHeader, CardBody, CardTitle } = Card;

class Users extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Users waiting for approval</CardTitle>
                </CardHeader>
                <CardBody>
                    <ApprovalTable />
                </CardBody>
            </Card>
        );
    }
}

export default Users;