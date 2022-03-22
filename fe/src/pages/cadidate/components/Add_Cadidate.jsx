import React, { useState } from 'react';
import { Col, Row, Form, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { DrawerComponent } from '../../../components';
import { addCadidateServices } from '../../../services/cadidateServices';
import { hasResponseError } from '../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getAllCadidates } from '../../../redux/stores/cadidate/actions';
import { selectJobId } from '../../../redux/stores/job/selectors';
import { renderEducation, renderEmployee, prefixSelector } from './render';

function Add_Cadidate(props) {
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);

  const { getAllCadidates, jobId } = props;
  const { onclose, visible, params } = props;

  const onFinish = async (values) => {
    let body = {
      jobId: jobId,
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      fullName: `${values.firstName} ${values.midName} ${values.lastName}`,
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
    getAllCadidates(params);
    onclose();
  };

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
          Add
        </Button>
      </Form>
    </DrawerComponent>
  );
}

const mapStateToProps = createStructuredSelector({
  jobId: selectJobId,
});
const mapDispatchToProps = (dispatch) => ({
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Add_Cadidate);
