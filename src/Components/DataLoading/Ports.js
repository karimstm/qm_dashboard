import React, { Component } from 'react';
import { Form, Input, Icon, Button, InputNumber } from 'antd';
import { PostPorts } from '../../actions/ports';
import { connect } from 'react-redux';
import { openNotification, successNotifiaction } from '../NotificationMessages';
import { PORT_INSERT_SUCCESS } from '../../actions/types';


class Ports extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostPorts(values)
                .then(res => {
                    if (res.type === PORT_INSERT_SUCCESS)
                        successNotifiaction("Port has been added successfuly")
                })
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const portNameError = isFieldTouched('name') && getFieldError('name');
        const portsdocksError = isFieldTouched('docks') && getFieldError('docks');
        const { error } = this.props;
        
        if (error )
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={portNameError ? 'error' : ''} help={portNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Ports Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={portsdocksError ? 'error' : ''} help={portsdocksError || ''}>
                        {getFieldDecorator('docks', {
                            rules: [{ required: true, message: 'Please enter a docks' }],
                        })(
                            <InputNumber min={1} max={10} placeholder="Number of docks" style={{ width: '100%' }} />,
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
        ports: state.ports.ports,
        error: state.ports.error,
    }
}

export default connect(
    mapStateToProps, {
        PostPorts
    }
)(Form.create({ name: 'horizontal_product' })(Ports));
