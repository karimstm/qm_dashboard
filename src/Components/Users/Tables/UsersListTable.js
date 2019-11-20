import React, { Component } from 'react';
import { Table, Button, Tag } from 'antd';


class UsersListTable extends Component {


    //Get the user status and dispaly tags
    getStatus = (is_active, is_refused) => {
        if (is_active && !is_refused)
            return <Tag color="#55efc4">Active</Tag>
        else if (is_refused)
            return  <Tag color="#f1c40f">Pending</Tag>
        return <Tag color="#ff7675">Disabled</Tag>
    }

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
            title: 'Status',
            key: 'is_active',
            render: (text, { is_active, profile }) => {
                this.getStatus(is_active, profile.is_refused)
            }
        },
        {
          title: 'Action',
          key: 'profile',
          render: (text, {id, is_active}) => {
            return (
                <span>
              {
                  is_active ? <Button onClick={() => this.props.onAction(id, false)} type="danger" >Disable</Button> : <Button onClick={() => this.props.onAction(id, true)} type="primary" >Enable</Button>
              }
            </span>
            )
          }
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

export default UsersListTable;