import React from 'react';
import './styles.css';
import { Button, Divider, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';
import { changPassRequestService } from '../../services/authServices';
import { toast } from 'react-toastify';

function ChangePassPage() {
  const onFinish = (values) => {
    const params = {
      email: values.email,
    };
    changPassRequestService(params).then((res) => {
      if (res.status < 200 || res.status > 300) {
        toast.error(res.data.message);
        return;
      }
      toast.success('Please check mail!');
    });
  };
  return (
    <div className="main">
      <div className="header fr">
        <NavLink to="/login">
          <Button>Back</Button>
        </NavLink>
      </div>
      <Divider />
      <div className="content-mail">
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              className="content-mail_input"
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="content-mail_btn"
              type="primary"
              htmlType="submit"
            >
              Send mail
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassPage;
