import React from 'react';
import { Form, Input, Button, Col, Row, Spin } from 'antd';
import './style.css';
import bg_login from '../../assets/image/bg_login.jpeg';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { selectLoading } from '../../redux/stores/auth/selectors';
import * as actions from '../../redux/stores/auth/actions';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, NavLink } from 'react-router-dom';

function Login(props) {
  /**
   * create state to props
   */
  const { loginRequest } = props;
  const { isLoading } = props;

  const navigation = useNavigate();

  /**
   * submit form login
   * @param {*} values
   */
  const onFinish = async (values) => {
    const params = {
      username: values.username,
      password: values.password,
    };
    const res = await loginRequest(params);
    if (res) {
      navigation('/');
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
                  { required: true, message: 'Please input your password!' },
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
                <NavLink to="/changePassword">Forgot password</NavLink>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {isLoading && <Spin />} Log in
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
});
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => actions.loginRequest(dispatch)(payload),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
