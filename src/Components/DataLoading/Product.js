import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import { FetchCategroy, PostProduct } from '../../actions/product';
import { connect } from 'react-redux';
import { openNotification } from '../NotificationMessages';


const { Option } = Select;

class Product extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostProduct(values)
            }
        });
    };


    // Fetch categories from the back-end
    fetchCategories = async () => {
        const { FetchCategroy } = this.props;
        await FetchCategroy();
    }

    // Fetch Categories once the component is mounted
    componentDidMount(){
        this.fetchCategories()
    }

    // Render list of categories
    renderCategories = () => {
        const { error, categories } = this.props
        if (!error && categories.length)
        {
            return categories.map((value) => {
                return <Option key={ value.id } value={ value.id }>{ value.name }</Option>   
            })
        }
        return null
    }

    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const productNameError = isFieldTouched('name') && getFieldError('name');
        const { error, insertError } = this.props;

        if (error )
            openNotification(error)
        else if (insertError)
            openNotification(insertError)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={productNameError ? 'error' : ''} help={productNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Product Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('product_category_ref', {
                            rules: [{ required: true, message: 'Please select a Category!' }],
                        })(
                            <Select placeholder="Please select a Category">
                                { this.renderCategories() }
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="ant-modal-footer" style={{ borderTop: 0 }}>
                            <Button onClick={this.props.onCancel}>
                                Close
                            </Button>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Add
                            </Button>
                        </div>
                        
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        error: state.categories.error,
        insertError: state.products.error
    }
}

export default connect(
    mapStateToProps, {
        FetchCategroy,
        PostProduct
    }
)(Form.create({ name: 'horizontal_product' })(Product));
