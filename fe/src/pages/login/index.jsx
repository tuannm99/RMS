import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, notification, Col, Row } from 'antd';
import './style.css';
import bg_login from '../../assets/image/bg_login.jpeg';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  selectLoading,
  selectUserInfor,
} from '../../redux/stores/auth/selectors';
import * as actions from '../../redux/stores/auth/actions';
import {
  LockOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
} from '@ant-design/icons';

function Login(props) {
  const navigation = useNavigate();
  const { loginRequest } = props;

  const onFinish = async (values) => {
    const params = {
      username: values.username,
      password: values.password,
    };
    const data = await loginRequest(params);
    if (values.remember === true && values.username !== '') {
      localStorage.setItem('username', values.username);
      localStorage.setItem('checked', values.remember);
    }
    if (data) {
      navigation('/');
      notification.open({
        message: `'Đăng Nhập Thành công'`,
        icon: <CheckOutlined style={{ color: 'green' }} />,
      });
    } else {
      notification.open({
        message: `'Sai tên đăng nhập hoặc mật khẩu!'`,
        icon: <CloseOutlined style={{ color: 'red' }} />,
      });
    }
  };

  return (
    <div className="login">
      <Row>
        <Col span={18} className="login-left">
          <img src={bg_login} alt="" />
        </Col>
        <Col span={6}>
          <div className="login-right">
            <h3>Login to continue</h3>
            <Form
              className="login-form"
              name="normal_login"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { min: 6, message: 'Username must be minimum 6 characters.' },
                ]}
              >
                <Input
                  className="login-form_input"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { min: 5, message: 'Password must be minimum 5 characters.' },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  className="login-form_input"
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  infoUser: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => actions.loginRequest(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
