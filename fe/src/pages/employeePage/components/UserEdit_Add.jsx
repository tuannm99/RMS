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
  base64String,
  convertFileToBase64,
  hasResponseError,
} from '../../../utils/utils';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const dateFormat = 'YYYY/MM/DD';

const { Option } = Select;

function UserEditAdd({
  onclose,
  visible,
  user,
  getAlldata,
  params,
  checked,
  setChecked,
  account,
}) {
  const [form] = Form.useForm();
  /**
   * create state
   */
  const [imageUser, setImageUser] = useState();
  const [fileList, setFileList] = useState(null);
  /**
   * set value in form and avatar render first
   */
  useLayoutEffect(() => {
    form.resetFields();
    if (user) {
      services.getDetailUsersServices(user).then((res) => {
        if (res.data.avatar) {
          setImageUser(
            `data:image/png;base64,${base64String(
              res.data.avatar.imageBuffer.data
            )}`
          );
        } else {
          setImageUser(null);
        }
        form.setFieldsValue({
          username: res.data.username,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phone: res.data.phone,
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
    if (isImg) {
      convertFileToBase64(fileImg).then((res) => {
        fileImg['base64'] = res;
        setImageUser(res);
        setFileList(fileImg);
      });
      setChecked(false);
    } else {
      setChecked(true);
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
      phone: values.phone,
      fullName: `${values.firstName} ${values.lastName}`,
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
      if (fileList) {
        formRes.append('avatar', fileList);
        await services.updateImgUsersServices(user, formRes).then((res) => {
          if (hasResponseError(res)) {
            toast.error(`${res.data.message}`);
            return;
          }
        });
      }
      await services.updateUsersServices(user, body).then((res) => {
        if (hasResponseError(res)) {
          toast.error(`${res.data.message}`);
          return;
        }
        toast.success('Edit success!');
      });
    } else {
      await registerRequestService(body).then((res) => {
        if (hasResponseError(res)) {
          toast.error(`${res.data.message} `);
          return;
        }
        toast.success('Add success');
      });
    }
    getAlldata(params);
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
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

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
            <Upload maxCount={1} onChange={handlePreview}>
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
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter First Name!' }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter Last Name!' }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter Address' }]}
            >
              <Input placeholder="Enter Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="languages" label="Language">
              <Input placeholder="Enter Language" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateOfBirth" label="Date Of Birth">
              <DatePicker format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select Role!' }]}
            >
              <Select name="role" disabled={account?.role !== 'admin' && true}>
                <Option value="admin">Admin</Option>
                <Option value="hiringManager">Hiring Manager</Option>
                <Option value="employee">Employee</Option>
                <Option value="guest">Guest</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Account"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 6, message: 'Username must be minimum 6 characters.' },
              ]}
            >
              <Input placeholder="Enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 8, message: 'Password must be minimum 8 characters.' },
              ]}
            >
              <Input.Password />
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
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
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
              <Input placeholder="Enter Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          Company
        </Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="employeeType" label="Position">
              <Input placeholder="Enter Position" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="primaryTeam" label="Team">
              <Input placeholder="Enter Team" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="department" label="Department">
              <Input placeholder="Please enter Department!" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="level" label="Level">
              <Input placeholder="Please enter Level" />
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
        <Button type="primary" htmlType="submit" className="btn-submit">
          {user ? 'Edit' : 'Add'}
        </Button>
      </Form>
    </DrawerComponent>
  );
}

export default UserEditAdd;
