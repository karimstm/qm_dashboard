import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import { FetchType, PostFamily } from '../../actions/product';
import { connect } from 'react-redux';
import { openNotification } from '../NotificationMessages';


const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Type extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostFamily(values)
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const productNameError = isFieldTouched('name') && getFieldError('name');
        const { error, insertError } = this.props;

        if (error )
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={productNameError ? 'error' : ''} help={productNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Product Type Name"
                            />,
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
        types: state.types.types,
        error: state.types.error,
    }
}

export default connect(
    mapStateToProps, {
        PostType
    }
)(Form.create({ name: 'horizontal_product' })(Type));
