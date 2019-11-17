import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import Product from './Product';
import ModalContent from '../Shared/ModalContent';
import ProductTable from './Tables/ProductTable';
import { FetchProducts, FetchCategroy, FetchFamily } from '../../actions/product';
import { connect } from 'react-redux';
import { openNotification } from '../NotificationMessages';
import DropdownList from './DropdownList';
import CategoryTable from './Tables/CategoryTable';
import FamilyTable from './Tables/FamilyTable';

const { TabPane } = Tabs

class DataLoading extends Component {

    
    state = {
        visible: false,
        type: Product,
        title: "Product"
    }

    // Change the modale state from visible to invisible and vice versa
    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    // Handle Submit of any form
    // Yet to be implemented
    handleSubmit = (values) => {
        console.log(values);
    }

    // Fetch Product list from database
    // and send it to product table component <ProductTable />
    fetchProduct = async () => {
        const { FetchProducts } = this.props;
        await FetchProducts()
    }

    // Fetch List of categories
    fetchCategories = async () => {
        const { FetchCategroy } = this.props;
        await FetchCategroy()
    }

    // Fetch List of product families
    fetchFamilies = async () => {
        const { FetchFamily } = this.props;
        await FetchFamily()
    }

    // Fetch data one component is mounted
    componentDidMount() {
        this.fetchProduct();
        this.fetchCategories();
        this.fetchFamilies();
    }

    action = (type, title) => {
        this.setState({ type, title }, () => this.showModal())
    }

    render() {
        const { products, error, categories, categoriesError, families, familiesError } = this.props;
        if (error || categoriesError || familiesError )
            openNotification(error);
        return (
            <>
                <DropdownList action={this.action} />
                <Tabs size="large" defaultActiveKey="1" style={{ clear: 'both'}}>
                    <TabPane tab="Product" key="1">
                        <ProductTable dataSource={products} />
                    </TabPane>
                    <TabPane tab="Category" key="2">
                       <CategoryTable dataSource={categories} />
                    </TabPane>
                    <TabPane tab="Family" key="3">
                        <FamilyTable dataSource={families} />
                    </TabPane>
                </Tabs>
                <ModalContent
                    title={`Add a ${this.state.title}`}
                    onCancel={() => this.setState({ visible: false })}
                    component={this.state.type} 
                    visible={this.state.visible} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        families: state.families.families,
        categories: state.categories.categories,
        error: state.products.error,
        categoriesError: state.categories.error,
        familiesError: state.families.error
    }
}

export default connect(mapStateToProps,
{ 
    FetchProducts,
    FetchCategroy,
    FetchFamily
})(DataLoading);