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
        title: 'Family',
        dataIndex: 'family',
        key: 'family',
    }
]

class CategoryTable extends Component {
    render() {
        const { dataSource } = this.props;
        return (
            <div>
                <Table pagination={{ pageSize: 6 }} columns={columns} dataSource={dataSource} rowKey="id" />
            </div>
        );
    }
}

export default CategoryTable;