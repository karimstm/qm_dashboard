import React, { Component } from 'react';
import { Form, Input, Icon, Button, InputNumber } from 'antd';
import { PostVessel } from '../../actions/vessel';
import { connect } from 'react-redux';
import { openNotification, successNotifiaction } from '../NotificationMessages';
import { VESSEL_INSERT_SUCCESS } from '../../actions/types';


class Vessel extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.props.PostVessel(values)
                .then(res => {
                    if (res.type === VESSEL_INSERT_SUCCESS)
                        successNotifiaction("Vessel has been added successfuly")
                })
            }
        });
    };


    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const vesselNameError = isFieldTouched('name') && getFieldError('name');
        const vesselholdsError = isFieldTouched('holds') && getFieldError('holds');
        const { error } = this.props;

        if (error )
            openNotification(error)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item validateStatus={vesselNameError ? 'error' : ''} help={vesselNameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter a name' }],
                        })(
                            <Input
                                prefix={<Icon type="shopping-cart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Vessel Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={vesselholdsError ? 'error' : ''} help={vesselholdsError || ''}>
                        {getFieldDecorator('holds', {
                            rules: [{ required: true, message: 'Please enter a holds' }],
                        })(
                            <InputNumber min={1} max={10} placeholder="Number of holds" style={{ width: '100%' }} />,
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
        vessels: state.vessels.vessels,
        error: state.vessels.error,
    }
}

export default connect(
    mapStateToProps, {
        PostVessel
    }
)(Form.create({ name: 'horizontal_product' })(Vessel));
