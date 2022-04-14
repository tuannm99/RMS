import React from 'react';
import { Col, Row, Form, Button, Input, Select } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { renderEducation, renderEmployee } from '../render';

const { Option } = Select;

function FormInfo(props) {
  const {
    form,
    onFinish,
    btnName,
    disableEmp,
    setDisableEmp,
    disableEdu,
    setDisableEdu,
  } = props;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="+84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{ prefix: '+84' }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please enter First Name!' },
              {
                pattern: new RegExp(/[a-zA-X]/),
                message: 'Please enter First Name!',
              },
            ]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="midName" label="Middle Name">
            <Input placeholder="Enter Full Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Please enter Last Name!' },
              {
                pattern: new RegExp(/[a-zA-X]/),
                message: 'Please enter Last Name!',
              },
            ]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="sex"
            label="Sex"
            rules={[{ required: true, message: 'Please select Sex!' }]}
          >
            <Select name="sex">
              <Option value="male">male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
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
        <Col span={24}>
          <Form.Item
            name="hyperlink"
            label="Hyperlink"
            rules={[
              {
                required: true,
                message: 'Please enter Hyperlink!',
              },
              {
                pattern: new RegExp(/[a-zA-X]/),
                message: 'Please enter Hyperlink!',
              },
            ]}
          >
            <Input placeholder="Enter Hyperlink" />
          </Form.Item>
        </Col>
        <Col span={24}>
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
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      {disableEmp && renderEmployee({ setDisableEmp })}
      {!disableEmp && (
        <Row>
          <Col>
            <div onClick={() => setDisableEmp(true)} className="cu">
              <PlusCircleFilled style={{ color: 'green' }} /> Add Employee
            </div>
          </Col>
        </Row>
      )}
      {disableEdu && renderEducation({ setDisableEdu })}
      {!disableEdu && (
        <Row className="mt-8">
          <Col>
            <div onClick={() => setDisableEdu(true)} className="cu">
              <PlusCircleFilled style={{ color: 'green' }} /> Add Education
            </div>
          </Col>
        </Row>
      )}
      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        style={props.stylesBtn}
      >
        {btnName}
      </Button>
    </Form>
  );
}

export default FormInfo;
