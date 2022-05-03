import React from 'react';
import './styles.css';
import { Button, Divider, Form, Input, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import { forgotRequestService } from '../../services/authServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { usernameRedux } from '../../redux/stores/auth/selectors';
import { setNameUser } from '../../redux/stores/auth/actions';

import {
  UserOutlined,
  MailOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

function ForgotPassPage(props) {
  const { setNameUser } = props;
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const onFinish = () => {
    const params = {
      email: form.getFieldValue().email,
      username: form.getFieldValue().username,
    };

    if (!form.getFieldValue().email || !form.getFieldValue().username) {
      toast.error('Please enter your email and username!');
      return;
    }
    forgotRequestService(params).then((res) => {
      if (res.status < 200 || res.status > 300) {
        toast.error(res.data.message);
        return;
      }
      setNameUser(params.username);
      navigation('/login');
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
        <Form autoComplete="off" form={form}>
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
              className="content-mail_input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
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
              prefix={<MailOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              onConfirm={onFinish}
              placement="bottomLeft"
              title="Are you sure to send this email?"
              icon={<QuestionCircleOutlined style={{ color: 'royalblue' }} />}
            >
              <Button type="primary" style={{ width: '100%' }}>
                Send Mail
              </Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  user: usernameRedux,
});
const mapDispatchToProps = (dispatch) => ({
  setNameUser: (payload) => dispatch(setNameUser(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ForgotPassPage);
