import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import { FetchType, PostFamily } from '../../actions/product';
import { connect } from 'react-redux';
import { openNotification } from '../NotificationMessages';


const { Option } = Select;


class Family extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.PostFamily(values)
            }
        });
    };


    // Fetch categories from the back-end
    fetchtypes = async () => {
        const { FetchType } = this.props;
        await FetchType();
    }

    // Fetch types once the component is mounted
    componentDidMount(){
        this.fetchtypes()
    }

    // Render list of categories
    rendertypes = () => {
        const { error, types } = this.props
        if (!error && types.length)
        {
            return types.map((value) => {
                return <Option key={ value.id } value={ value.id }>{ value.name }</Option>   
            })
        }
        return null
    }

    render() {

        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const productNameError = isFieldTouched('name') && getFieldError('name');
        const { error } = this.props;

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
                                placeholder="Product Family Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item hasFeedback>
                        {getFieldDecorator('product_type_ref', {
                            rules: [{ required: true, message: 'Please select a Category!' }],
                        })(
                            <Select placeholder="Please select a Type">
                                { this.rendertypes() }
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
        types: state.types.types,
        error: state.types.error,
    }
}

export default connect(
    mapStateToProps, {
        FetchType,
        PostFamily
    }
)(Form.create({ name: 'horizontal_product' })(Family));
