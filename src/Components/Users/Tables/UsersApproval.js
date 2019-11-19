import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [
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
        dataIndex: 'company',
        key: 'company'
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company'
    }
]

class ApprovalTable extends Component {
    render() {
        const { dataSource } = this.props;
        return (
            <div>
                <Table pagination={{ pageSize: 6 }} columns={columns} dataSource={dataSource} rowKey="id" />
            </div>
        );
    }
}

export default ApprovalTable;