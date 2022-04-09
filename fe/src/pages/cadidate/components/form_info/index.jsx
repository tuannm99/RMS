import React from 'react';
import { Col, Row, Form, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { renderEducation, renderEmployee, prefixSelector } from '../render';

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
        <Col span={24}>
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
      <Button type="primary" htmlType="submit" className="btn-submit">
        {btnName}
      </Button>
    </Form>
  );
}

export default FormInfo;
