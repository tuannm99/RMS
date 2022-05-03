import React, { useLayoutEffect, useState } from 'react';
import {
  Divider,
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Avatar,
  Button,
} from 'antd';
import { DrawerComponent } from '../../../components';
import * as services from '../../../services/employeeServices';
import { registerRequestService } from '../../../services/authServices';
import {
  imgURL,
  convertFileToBase64,
  hasResponseError,
} from '../../../utils/utils';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { imageUser } from '../../../redux/stores/auth/selectors';
import { setImageUser } from '../../../redux/stores/auth/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const dateFormat = 'YYYY/MM/DD';

const { Option } = Select;

function UserEditAdd({
  onclose,
  visible,
  user,
  users,
  params,
  setParams,
  checked,
  setChecked,
  account,
  setImgUser,
  imgUser,
}) {
  /**
   * create state
   */
  const [imageUser, setImageUser] = useState();
  const [fileList, setFileList] = useState(null);
  const [fileL, setFileL] = useState(null);
  const [form] = Form.useForm();

  /**
   * set value in form and avatar render first
   */
  useLayoutEffect(() => {
    form.resetFields();
    if (user) {
      services.getDetailUsersServices(user).then((res) => {
        if (res.data.avatar) {
          setImageUser(`${imgURL}${res.data.avatar.path}`);
        } else {
          setImageUser(null);
        }
        form.setFieldsValue({
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone.slice(3),
          sex: res.data.sex,
          address: res.data.address,
          dateOfBirth: moment(res.data.dateOfBirth),
          languages: res.data.languages,
          employeeType: res.data.jobStatus.employeeType,
          employeeStatus: res.data.jobStatus.employeeStatus,
          dateOfJoining: moment(res.data.jobStatus.dateOfJoining),
          department: res.data.jobStatus.department,
          primaryTeam: res.data.jobStatus.primaryTeam,
          level: res.data.jobStatus.level,
          role: res.data.role,
        });
      });
    } else {
      setImageUser(null);
    }
  }, [user, form]);
  /**
   * convert file to image
   * @param {*} file
   */
  const handlePreview = (file) => {
    const isImg =
      file.file.type === 'image/jpeg' ||
      file.file.type === 'image/jpg' ||
      file.file.type === 'image/png' ||
      file.file.type === 'image/gif';
    let fileImg = file.fileList[0].originFileObj;
    if (fileImg.size > 1024 * 1024 * 5) {
      alert('Please choose image less than 5mb!');
      return;
    }
    if (isImg || fileImg.size > 1024 * 1024 * 5) {
      convertFileToBase64(fileImg).then((res) => {
        fileImg['base64'] = res;
        setImageUser(res);
        setFileList(fileImg);
        setFileL(file.fileList);
      });
      setChecked(false);
    } else {
      setChecked(true);
      alert(
        'Please choose image have type image/jpeg, image/jpg, image/png, image/gif!'
      );
    }
  };

  /**
   * Submit form edit or add
   * @param {*} values
   */
  const onFinish = async (values) => {
    const formRes = new FormData();
    let body = {
      username: values.username,
      password: values.password,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: `${values.prefix}${values.phone}`,
      sex: values.sex,
      fullName: `${values.lastName} ${values.firstName}`,
      dateOfBirth: values.dateOfBirth,
      languages: values.languages,
      address: values.address,
      role: values.role,
      jobStatus: {
        employeeStatus: values.employeeStatus,
        employeeType: values.employeeType,
        dateOfJoining: values.dateOfJoining,
        department: values.department,
        primaryTeam: values.primaryTeam,
        level: values.level,
      },
    };
    if (user) {
      delete body.password;
      delete body.username;
      if (fileList) {
        formRes.append('avatar', fileList);
        const res = await services.updateImgUsersServices(user, formRes);
        if (hasResponseError(res)) {
          toast.error(`${res.data.message}`);
          return;
        }
        setImgUser(imageUser);
      }
      await services.updateUsersServices(user, body).then((res) => {
        if (hasResponseError(res)) {
          toast.error(`${res.data.message}`);
          return;
        }
        toast.success('Edit success!');
      });
      setParams({ ...params });
    } else {
      await registerRequestService(body).then((res) => {
        if (hasResponseError(res)) {
          toast.error(`${res.data.message} `);
          return;
        }
        toast.success('Add employee successful!');
      });
      if (
        users.totalResults >= users.limit &&
        users.totalResults % users.limit === 0
      ) {
        await setParams({ ...params, page: users.page + 1 });
      } else {
        await setParams({ ...params });
      }
      form.resetFields();
    }
    onclose();
    setChecked(false);
  };
  /**
   * style for avatar
   */
  const styleImg = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+84">+84</Option>
      </Select>
    </Form.Item>
  );

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  return (
    <DrawerComponent
      title={user ? 'EDIT EMPLOYEE.' : 'CREATE EMPLOYEE.'}
      onClose={onclose}
      visible={visible}
      width={720}
    >
      {user && (
        <Row>
          <Col span={12}>
            {imageUser ? (
              <img style={styleImg} className="mb-12" src={imageUser} alt="" />
            ) : (
              <Avatar
                shape="square"
                size={100}
                className="mb-12"
                icon={<UserOutlined />}
              />
            )}
            {checked && <p style={{ color: 'red' }}>Only upload image</p>}
          </Col>
          <Col span={12}>
            <Upload maxCount={1} onChange={handlePreview} fileList={fileL}>
              <Button>Change Avatar</Button>
            </Upload>
          </Col>
        </Row>
      )}
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ prefix: '+84' }}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: 'Please enter First Name!' },
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
                {
                  pattern: new RegExp(/[a-zA-Z]/),
                  message: 'First Name exists at least 1 character',
                },
              ]}
            >
              <Input placeholder="Enter First Name" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: 'Please enter Last Name!' },
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
                {
                  pattern: new RegExp(/[a-zA-Z]/),
                  message: 'Last Name exists at least 1 character',
                },
              ]}
            >
              <Input placeholder="Enter Last Name" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: 'Please enter Address' },
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
              ]}
            >
              <Input placeholder="Enter Address" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="languages" label="Language">
              <Input placeholder="Enter Language" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateOfBirth" label="Date Of Birth">
              <DatePicker format={dateFormat} disabledDate={disabledDate} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sex"
              label="Gender"
              rules={[{ required: true, message: 'Please select Sex!' }]}
            >
              <Select name="sex">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select Role!' }]}
            >
              <Select
                name="role"
                disabled={
                  (account?.role !== 'admin' || user === account?.id) && true
                }
              >
                <Option value="hiringManager">Hiring Manager</Option>
                <Option value="employee">Employee</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Account"
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
                placeholder="Enter user name"
                disabled={user && true}
                allowClear={true}
              />
            </Form.Item>
          </Col>
        </Row>
        {!user && (
          <Row gutter={16}>
            <Col span={12}>
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
                <Input.Password allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
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
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password allowClear={true} />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Divider orientation="left" plain>
          Contact
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter Email!' },
                { type: 'email', message: 'Please enter the correct email!' },
              ]}
            >
              <Input placeholder="Enter Email" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                {
                  pattern: new RegExp('^[ ]*[0-9]{9}[ ]*$'),
                  message: 'Your phone is from 9 digits!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                allowClear={true}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          Company
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="employeeType" label="Position">
              <Input
                placeholder="Enter Position"
                allowClear={true}
                rules={[
                  {
                    pattern: new RegExp(/^[^\s].*/),
                    message: 'The start character cannot be a space.',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="primaryTeam"
              label="Team"
              rules={[
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
              ]}
            >
              <Input placeholder="Enter Team" allowClear={true} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
              ]}
            >
              <Input placeholder="Please enter Department!" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="level"
              label="Level"
              rules={[
                {
                  pattern: new RegExp(/^[^\s].*/),
                  message: 'The start character cannot be a space.',
                },
              ]}
            >
              <Input placeholder="Please enter Level" allowClear={true} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="employeeStatus" label="Status">
              <Select name="employeeStatus">
                <Option value="active">Active</Option>
                <Option value="noActive">No active</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateOfJoining" label="Date Of Joining">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          style={{ position: 'absolute', top: '15px', right: '15px' }}
        >
          {user ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </DrawerComponent>
  );
}
const mapStateToProps = createStructuredSelector({
  imgUser: imageUser,
});
const mapDispatchToProps = (dispatch) => ({
  setImgUser: (payload) => dispatch(setImageUser(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserEditAdd);
