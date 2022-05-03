import React from 'react';
import { Form, Input, Button, Col, Row, Spin, Carousel } from 'antd';
import './style.css';
import login_6 from '../../assets/image/login_6.jpg';
import login_5 from '../../assets/image/login_5.jpg';
import login_9 from '../../assets/image/login_9.jpg';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  selectLoading,
  usernameRedux,
} from '../../redux/stores/auth/selectors';
import * as actions from '../../redux/stores/auth/actions';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, NavLink } from 'react-router-dom';

function Login(props) {
  /**
   * create state to props
   */
  const { loginRequest, setNameUser } = props;
  const { isLoading, user } = props;
  const [form] = Form.useForm();

  const navigation = useNavigate();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user,
      });
    }
  }, [form, user]);

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
      setNameUser(null);
      navigation('/');
    }
  };

  return (
    <div className="login">
      <Row>
        <Col span={18} className="login-left">
          <Carousel autoplay dotPosition="bottom" speed="800">
            <div>
              <img
                src={
                  'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                }
                alt=""
              />
            </div>
            <div>
              <img
                src={
                  'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                }
                alt=""
              />
            </div>
            <div>
              <img
                src={
                  'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                }
                alt=""
              />
            </div>
          </Carousel>
        </Col>
        <Col span={6}>
          <div className="login-right">
            <h3>Login to continue</h3>
            <Form
              className="login-form"
              name="normal_login"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your Account!' },
                  {
                    pattern: new RegExp(/^\S+$/),
                    message: "Account don't enter space!",
                  },
                  {
                    pattern: new RegExp(/[a-zA-Z]/),
                    message: 'Account exists at least 1 character',
                  },
                  {
                    min: 6,
                    message: 'Account must be minimum 6 characters',
                  },
                  {
                    max: 50,
                    message: 'Account must be maximum 50 characters',
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
                  { required: true, message: 'Please input your password!' },
                  {
                    pattern: new RegExp(/^\S+$/),
                    message: "password don't enter space!",
                  },
                  {
                    min: 8,
                    message: 'Password must be minimum 8 characters',
                  },
                  {
                    max: 50,
                    message: 'Password must be maximum 50 characters',
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
                <NavLink to="/changePassword">Forgot password</NavLink>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {isLoading && <Spin />} Login
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
  user: usernameRedux,
});
const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => actions.loginRequest(dispatch)(payload),
  setNameUser: (payload) => dispatch(actions.setNameUser(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
