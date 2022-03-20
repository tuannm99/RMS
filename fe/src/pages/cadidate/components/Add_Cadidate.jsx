import React, { useState } from 'react';
import {
  Divider,
  Col,
  Row,
  Form,
  Button,
  Space,
  Select,
  Input,
  DatePicker,
} from 'antd';
import {
  MinusCircleFilled,
  PlusOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';
import { DrawerComponent } from '../../../components';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Add_Cadidate({ onclose, visible, getAlldata, params }) {
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);

  const onFinish = (values) => {};
  const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
  };

  const handleAddEmployee = () => {
    setDisableEmp(true);
  };

  const handleRemoveEmp = () => {
    setDisableEmp(false);
  };

  const handleAddEdu = () => {
    setDisableEdu(true);
  };

  const handleRemoveEdu = () => {
    setDisableEdu(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const renderEmployee = (
<>
<Divider orientation="left" >Emplpyee</Divider>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: 'Please enter Designation!' }]}
        >
          <Input placeholder="Enter designation" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="bussinessName"
          label="Company/ Business Name"
          rules={[
            { required: true, message: 'Please enter Company/ Business Name!' },
          ]}
        >
          <Input placeholder="Enter Company/ Business Name" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="fromto"
          label="From - To"
          rules={[{ required: true, message: 'Please enter From - To!' }]}
        >
          <RangePicker />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="summary"
          label="Summary"
        >
          <Input.TextArea />
        </Form.Item>
      </Col>
      <Col span={24}>
        <div className="cu" onClick={handleRemoveEmp}>
          <MinusCircleFilled style={{ color: 'red' }} /> Remove Employee
        </div>
      </Col>
    </Row></>
  );

  const renderEducation = (
    <>
    <Divider orientation="left" >Education</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="degree"
              label="Degree"
              rules={[{ required: true, message: 'Please enter Degree!' }]}
            >
              <Input placeholder="Enter designation" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="universityName"
              label="Institution/ School Name"
              rules={[
                { required: true, message: 'Please enterInstitution/ School Name!' },
              ]}
            >
              <Input placeholder="Enter Institution/ School Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="fieldOfStudy"
              label="Field of study/ Major"
            >
              <Input placeholder="Enter Field of study/ Major" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="grade"
              label="Grade"
            >
              <Input placeholder="Enter Grade" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="fromend"
              label="From - To"
              rules={[{ required: true, message: 'Please enter From - To!' }]}
            >
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="cu" onClick={handleRemoveEdu}>
              <MinusCircleFilled style={{ color: 'red' }} /> Remove Education
            </div>
          </Col>
        </Row></>
      );

  return (
    <DrawerComponent title="ADD CADIDATE" onClose={onclose} visible={visible}>
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
              rules={[{ required: true, message: 'Please enter First Name!' }]}
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
              rules={[{ required: true, message: 'Please enter Last Name!' }]}
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
        {disableEmp && renderEmployee}
        {!disableEmp && (
          <Row>
            <Col>
              <div onClick={handleAddEmployee} className="cu">
                <PlusCircleFilled style={{ color: 'green' }} /> Add Employee
              </div>
            </Col>
          </Row>
        )}
        {disableEdu && renderEducation}
        {!disableEdu && (
          <Row className='mt-8'>
            <Col>
              <div onClick={handleAddEdu} className="cu">
                <PlusCircleFilled style={{ color: 'green' }} /> Add Education
              </div>
            </Col>
          </Row>
        )}
        <Button type="primary" htmlType="submit" className="btn-submit">
          Add
        </Button>
      </Form>
    </DrawerComponent>
  );
}

export default Add_Cadidate;
