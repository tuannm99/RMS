import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
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
  const { selectLoading, selectUserInfor } = props;
  const { loginRequest } = props;
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('refreshToken');
  }, []);

  const onFinish = async (values) => {
    const params = {
      username: values.username,
      password: values.password,
    };
    console.log(params);
    const data = await loginRequest(params);
    console.log(data);
    if (data.statusText === 'OK') {
      navigation('/');
      notification.open({
        message: `'Đăng Nhập Thành công'`,
        icon: <CheckOutlined style={{ color: 'green' }} />,
      });
    } else {
      notification.open({
        message: 'Sai username hoac password',
        icon: <CloseOutlined style={{ color: 'red' }} />,
      });
    }
  };

  return (
    <div className="login">
      <div className="login-left">
        <div className="login-left-img">
          <img src={bg_login} alt="" />
        </div>
      </div>
      <div className="login-right">
        <h3>Login to continue</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' },
              {
                pattern: new RegExp('^[A-Za-z][A-Za-z0-9_]{5,29}$'),
                message:
                  'Username starts with a letter, is 6 to 30 characters long and can be lowercase, uppercase or "_"',
              },
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
              { required: true, message: 'Please input your Password!' },
              {
                pattern: new RegExp('^[A-Za-z][A-Za-z0-9_]{5,29}$'),
                message:
                  'Password starts with a letter, is 6 to 30 characters long and can be lowercase, uppercase or "_"',
              },
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
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
