import React, { Component } from 'react';
import { Table, Divider, Button } from 'antd';


class ApprovalTable extends Component {

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Company',
            dataIndex: 'profile.company_name',
            key: 'profile.company_name'
        },
        {
          title: 'Action',
          key: 'profile',
          render: (text, {id}) => (
            <span>
              <Button onClick={() => this.props.onAction(id, false)} type="default" >Approve</Button>
                <Divider type="vertical" />
              <Button onClick={() => this.props.onAction(id, true)} type="danger" >Refuse</Button>
            </span>
          ),
        },
    ]
    

    render() {
        const { dataSource } = this.props;
        return (
            <div>
                <Table pagination={{ pageSize: 6 }} columns={this.columns} dataSource={dataSource} rowKey="id" />
            </div>
        );
    }
}

export default ApprovalTable;