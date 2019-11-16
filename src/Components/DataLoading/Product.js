import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select, Row, Col } from 'antd';


const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Product extends Component {
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const productNameError = isFieldTouched('product_name') && getFieldError('usproduct_nameername');
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item validateStatus={productNameError ? 'error' : ''} help={productNameError || ''}>
                                {getFieldDecorator('product_name', {
                                    rules: [{ required: true, message: 'Please enter a name' }],
                                })(
                                    <Input
                                        prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Product Name"
                                    />,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item hasFeedback>
                                {getFieldDecorator('category_id', {
                                    rules: [{ required: true, message: 'Please select a Category!' }],
                                })(
                                    <Select placeholder="Please select a country">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    Add
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </>
        );
    }
}

export default Form.create({ name: 'horizontal_product' })(Product);;
