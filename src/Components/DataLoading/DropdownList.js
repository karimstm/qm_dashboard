import React, { Component } from 'react';
import { Dropdown, Button, Menu, Icon } from 'antd';
import Product from './Product';
import Category from './Category';
import Family from './Family';
import Type from './Type';
import Client from './Client';



class DropdownList extends Component {

    onClick = ({ key }) => {
        if (key === "1" )
            this.props.action(Product, "Product")
        else if (key === "2")
            this.props.action(Category, "Category")
        else if (key === "3")
            this.props.action(Family, "Family")
        else if (key === "4")
            this.props.action(Type, "Type")
        else if (key === "5")
            this.props.action(Client, "Client")
        
    }

    menuList = (
        <Menu onClick={this.onClick}>
            <Menu.Item key="1">
                Product
            </Menu.Item>
            <Menu.Item key="2">
                Category
          </Menu.Item>
            <Menu.Item key="3">
                Family
          </Menu.Item>
            <Menu.Item key="4">
                Type
          </Menu.Item>
          <Menu.Item key="5">
                Client
          </Menu.Item>
          <Menu.Item key="6">
                Origin
          </Menu.Item>
          <Menu.Item key="7">
                Vesset
          </Menu.Item>
          <Menu.Item key="8">
                Port
          </Menu.Item>
        </Menu>
    );


    render() {
        return (
            <div style={{ float: 'right'}} >
                <Dropdown overlay={this.menuList}>
                    <Button >
                        Add a new... <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default DropdownList;