import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import { PostType } from '../../actions/product';
import { connect } from 'react-redux';
import { openNotification, successNotifiaction } from '../NotificationMessages';
import { VESSEL_INSERT_SUCCESS } from '../../actions/types';


class Vessel extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostType(values)
                .then(res => {
                    if (res.type === VESSEL_INSERT_SUCCESS)
                        successNotifiaction("Vessel has been added successfuly")
                })
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const clientNameError = isFieldTouched('name') && getFieldError('name');
        const clientDestinationError = isFieldTouched('destination') && getFieldError('destination');
        const { error } = this.props;

        if (error )
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={clientNameError ? 'error' : ''} help={clientNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Client Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={clientDestinationError ? 'error' : ''} help={clientDestinationError || ''}>
                        {getFieldDecorator('destination', {
                            rules: [{ required: true, message: 'Please enter a destination' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Client Destination"
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
        vessels: state.types.vessel,
        error: state.types.error,
    }
}

export default connect(
    mapStateToProps, {
        PostType
    }
)(Form.create({ name: 'horizontal_product' })(Vessel));
