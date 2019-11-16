import React, { Component } from 'react';
import { Tabs } from 'antd';
import Product from './Product';

const { TabPane } = Tabs

class DataLoading extends Component {

    callback = (key) => {
        console.log(key);
    }

    render() {
        return (
            <Tabs size="large" defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Product" key="1">
                    <Product />
                </TabPane>
                <TabPane tab="Client" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Origin" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        );
    }
}

export default DataLoading;