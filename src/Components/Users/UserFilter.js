import React, { Component } from 'react';
import { Form, Input, Icon, Button, Checkbox } from 'antd';

class UserFilter extends Component {


    state = {
        is_active: true
    }

    // Hangle check box changes set state is_active to true or false
    hangleIsActiveChange = () => {
        this.setState({ is_active: !this.state.is_active })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              this.props.onSubmit(values)
          }
        });
      };

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
        <Form layout="inline" onSubmit={this.handleSubmit} style={{ marginBottom: '2%' }}>
            <Form.Item>
                {getFieldDecorator("email")(
                <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                />)}    
            </Form.Item>
        <Form.Item>
            { getFieldDecorator("first_name")(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="First Name"
              />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator("last_name")(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Last Name"
              />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator("compnay_name")(
                <Input
                prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Company Name"
              />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator("is_active")(
                    <Checkbox checked={this.state.is_active} onChange={this.hangleIsActiveChange}>
                        is Active
                    </Checkbox>
            )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Filter
          </Button>
        </Form.Item>
      </Form>
        );
    }
}

export default Form.create()(UserFilter);