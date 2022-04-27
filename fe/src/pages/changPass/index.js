import React from 'react';
import { Form, Input, Button } from 'antd';
import './styles.css';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { hasResponseError } from '../../utils/utils';
import { changePassRequestService } from '../../services/authServices';

function ChangePass(props) {
  const { userAccount } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let body = {
      oldPassword: values.oldPassword,
      newPassword: values.password,
    };
    const res = await changePassRequestService(body, userAccount?.id);
    if (hasResponseError(res)) {
      toast.error(res.data.message);
      return;
    }
    form.resetFields();
    toast.success('You have successfully changed your password!');
  };
  return (
    <div className="wrap">
      <Form onFinish={onFinish} form={form} layout="vertical" className="form">
        <Form.Item
          name="oldPassword"
          label="Old password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            allowClear={true}
            placeholder="Enter your old password..."
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          hasFeedback
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
          <Input.Password
            allowClear={true}
            placeholder="Enter your new password..."
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            allowClear={true}
            placeholder="Enter your confirm password..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(ChangePass);
