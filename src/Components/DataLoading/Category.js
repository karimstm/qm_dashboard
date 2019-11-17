import React, { Component } from 'react';
import { Form, Button, Icon, Input, Select } from 'antd';
import { successNotifiaction, openNotification } from '../NotificationMessages';
import { connect } from 'react-redux';
import { PostCategory, FetchFamily } from '../../actions/product';
import { CATEGORY_INSERT_SUCCESS } from '../../actions/types';


const { Option } = Select;

class Category extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.PostCategory(values)
                .then(res => {
                    if (res.type === CATEGORY_INSERT_SUCCESS)
                        successNotifiaction("Category has been added successfuly")
                })
            }
        });
    };

    // Fetch List of families
    fetchFamilies = async () => {
        const { FetchFamily } = this.props
        await FetchFamily()
    }

    componentDidMount()
    {
        this.fetchFamilies()
    }

    // Render list of Families
    renderFamilies = () => {
        const { error, families } = this.props
        if (!error && families.length)
        {
            return families.map((value) => {
                return <Option key={ value.id } value={ value.id }>{ value.name }</Option>   
            })
        }
        return null
    }

    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const categoryNameError = isFieldTouched('name') && getFieldError('name');
        const { error } = this.props;

        if (error)
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={categoryNameError ? 'error' : ''} help={categoryNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Category Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('product_family_ref', {
                            rules: [{ required: true, message: 'Please select a Family!' }],
                        })(
                            <Select placeholder="Please select a Family">
                                { this.renderFamilies() }
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
        error: state.categories.error || state.families.error,
        families: state.families.families
    }
}

export default connect(
    mapStateToProps, {
        PostCategory,
        FetchFamily
    }
)(Form.create({ name: 'horizontal_product' })(Category));