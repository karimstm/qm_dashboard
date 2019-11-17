import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    }
]

class FamilyTable extends Component {
    render() {
        const { dataSource } = this.props;
        return (
            <div>
                <Table rowKey="id" pagination={{ pageSize: 6 }} columns={columns} dataSource={dataSource} />
            </div>
        );
    }
}

export default FamilyTable;