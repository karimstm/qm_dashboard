import React, { Component } from 'react';
import { Form, Input, Icon, Button, InputNumber } from 'antd';
import { PostOrigin } from '../../actions/origin';
import { connect } from 'react-redux';
import { openNotification, successNotifiaction } from '../NotificationMessages';
import { ORIGIN_INSERT_SUCCESS } from '../../actions/types';


class Origin extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostOrigin(values)
                .then(res => {
                    if (res.type === ORIGIN_INSERT_SUCCESS)
                        successNotifiaction("Origin has been added successfuly")
                })
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const originNameError = isFieldTouched('name') && getFieldError('name');
        const { error } = this.props;
        if (error )
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={originNameError ? 'error' : ''} help={originNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="origin Name"
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
        origins: state.origins.origins,
        error: state.origins.error,
    }
}

export default connect(
    mapStateToProps, {
        PostOrigin
    }
)(Form.create({ name: 'horizontal_product' })(Origin));
