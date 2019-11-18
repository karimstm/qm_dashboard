import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Family",
    dataIndex: "family",
    key: "family"
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  }
];
class ProductTable extends Component {
  render() {
    return (
      <div style={{ clear: "both" }}>
        <Table
          columns={columns}
          dataSource={this.props.dataSource}
          rowKey="id"
        />
      </div>
    );
  }
}

export default ProductTable;
