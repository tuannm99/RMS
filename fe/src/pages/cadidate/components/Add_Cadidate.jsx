import React, { useEffect, useState } from 'react';
import {
  Divider,
  Col,
  Row,
  Form,
  Button,
  Select,
  Input,
  DatePicker,
  AutoComplete,
} from 'antd';
import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons';
import { DrawerComponent } from '../../../components';
import { getAllJobs } from '../../../services/jobService';
import { addCadidateServices } from '../../../services/cadidateServices';
import { hasResponseError } from '../../../utils/utils';
import { toast } from 'react-toastify';

const { Option } = Select;
const { RangePicker } = DatePicker;

function Add_Cadidate({ onclose, visible, getAlldata, params }) {
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    getAllJobs().then((res) => {
      console.log(res);
      res.data.results.map((item) => {
        setjobs((prew) => {
          return [...prew, ...[{ id: item.id, label: item.title }]];
        });
      });
    });
    return () => {
      setjobs([]);
    };
  }, []);

  const onFinish = async (values) => {
    let body = {
      jobId: values?.JobId,
      status: 'open',
      stage: values?.stage,
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      email: values?.email,
      phone: values?.phone,
      resume: {
        CV: '',
        hyperlink: values?.hyperlink,
      },
    };
    if (disableEmp) {
      body.resume = {
        ...body.resume,
        employer: {
          designation: values.designation,
          bussinessName: values.bussinessName,
          from: values.fromto[0]._d.toISOString(),
          to: values.fromto[1]._d.toISOString(),
          summary: values.summary,
        },
      };
    }
    if (disableEdu) {
      body.resume = {
        ...body.resume,
        education: {
          degree: values?.degree,
          universityName: values?.universityName,
          fieldOfStudy: values?.fieldOfStudy,
          grade: values?.grade,
          from: values?.fromend[0]._d.toISOString(),
          end: values?.fromend[1]._d.toISOString(),
        },
      };
    }
    await addCadidateServices(body).then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      toast.success('Add caddidate success');
    });
    getAlldata(params);
    onclose();
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
      <Divider orientation="left">Emplpyee</Divider>
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
              {
                required: true,
                message: 'Please enter Company/ Business Name!',
              },
            ]}
          >
            <Input placeholder="Enter Company/ Business Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fromto"
            label="From - To"
            rules={[{ required: true, message: 'Please enter From - To!' }]}
          >
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="summary" label="Summary">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className="cu" onClick={handleRemoveEmp}>
            <MinusCircleFilled style={{ color: 'red' }} /> Remove Employee
          </div>
        </Col>
      </Row>
    </>
  );

  const renderEducation = (
    <>
      <Divider orientation="left">Education</Divider>
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
              {
                required: true,
                message: 'Please enterInstitution/ School Name!',
              },
            ]}
          >
            <Input placeholder="Enter Institution/ School Name" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="fieldOfStudy" label="Field of study/ Major">
            <Input placeholder="Enter Field of study/ Major" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="grade" label="Grade">
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
      </Row>
    </>
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
              name="hyperlink"
              label="Hyperlink"
              rules={[
                {
                  required: true,
                  message: 'Please enter Hyperlink!',
                },
              ]}
            >
              <Input placeholder="Enter Hyperlink" />
            </Form.Item>
          </Col>
          <Col span={8}>
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
          <Col span={8}>
            <Form.Item
              name="JobId"
              label="Type Job"
              rules={[{ required: true, message: 'Please select Job!' }]}
            >
              <Select name="JobId">
                {jobs &&
                  jobs.map((item) => (
                    <Option key={item.label} value={item.id}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="stage"
              label="Stage"
              rules={[
                {
                  required: true,
                  message: 'Please enter Stage!',
                },
              ]}
            >
              <Select name="stage">
                <Option value="contact">Contact</Option>
                <Option value="test">Test</Option>
                <Option value="technical">Technical</Option>
                <Option value="cultureFit">CultureFit</Option>
              </Select>
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
          <Row className="mt-8">
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
