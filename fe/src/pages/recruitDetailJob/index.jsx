import React, { useEffect, useState, useRef } from 'react';
import DetailJobComponent from './component/detailJobComponent';
import { useParams } from 'react-router-dom';
import {
  getJobsDetail,
  updateJobs,
  deleteJobs,
} from '../../services/jobService';
import { DrawerComponent } from '../../components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Input, Form, Select, Col, Row, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { set } from 'lodash';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

function DetailRecruitPage(props) {
  let { id } = useParams();
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [job, setJob] = useState({});
  const [ckeditorData, setCkeditorData] = useState('');
  const navigate = useNavigate();
  const { userAccount } = props;
  const { Option } = Select;
  const { TextArea } = Input;
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    setLoading(true);
    const jobDetail = await getJobsDetail(id);
    setJob(jobDetail.data);
    setCkeditorData(jobDetail.data.jobDescription);
    setLoading(false);
  };

  const openModal = (id) => {
    formModal.setFieldsValue({
      id: job.id,
      title: job.title,
      jobDescription: job.jobDescription,
      jobType: job.jobType,
      location: job.location,
      experience: job.experience,
      skill: job.skill,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      department: job.department,
      shortDes: job.shortDes,
    });

    setVisible(true);
  };

  const onclose = () => {
    setVisible(false);
  };

  const onFinish = async (jobValue) => {
    const body = {
      ...jobValue,
      jobDescription: ckeditorData === '' ? job.jobDescription : ckeditorData,
    };
    setLoading(true);
    updateJobs(jobValue.id, body)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => console.log(err));
    fetchJob();
    toast.success('Edit Job Detail Successful!', {
      autoClose: 3000,
    });
    setLoading(false);
    handleCancel();
  };

  const updateStatus = (value) => {
    const body = { status: value };
    updateJobs(id, body)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => console.log(err));
    fetchJob();
    toast.success('update Status Successful!', {
      autoClose: 3000,
    });
  };

  return (
    <>
      <div className="detailJob-header">
        <Breadcrumb>
          <Breadcrumb.Item>Recruitment</Breadcrumb.Item>
          <Link to={`/recruit`}>
            <Breadcrumb.Item>Recruit</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item>Detail Job</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Button
            className="Recruit-button"
            onClick={() => openModal(id)}
            disabled={userAccount.role !== 'hiringManager' && true}
          >
            Edit Detail
          </Button>
          <Select
            disabled={userAccount.role !== 'hiringManager' && true}
            value={job.status}
            style={{ width: 120 }}
            onSelect={updateStatus}
            className="recruit-Detail-selector"
          >
            <Option disabled={job.status === 'published'} value="published">
              Published
            </Option>
            <Option disabled={job.status === 'onHold'} value="onHold">
              Hode On
            </Option>
            <Option disabled={job.status === 'deleted'} value="deleted">
              Delete
            </Option>
          </Select>
        </div>
        <DrawerComponent
          title="Edit Job"
          onClose={onclose}
          visible={visible}
          width={720}
        >
          {loading ? (
            <Col style={{ textAlign: 'center' }} span={24}>
              <Spin tip="loading..." />
            </Col>
          ) : (
            <Form
              layout="vertical"
              onFinish={onFinish}
              form={formModal}
              name="formModal"
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="title"
                    label="Title Job"
                    rules={[
                      { required: true, message: 'Please Enter Job Title' },
                    ]}
                  >
                    <Input placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="department"
                    rules={[
                      { required: true, message: 'Please Select Department' },
                    ]}
                    label="Department"
                  >
                    <Select style={{ width: 300 }}>
                      <Option value="administration">Administrtion</Option>
                      <Option value="finance">Finance</Option>
                      <Option value="marketing">Maketing</Option>
                      <Option value="sale">Sale</Option>
                      <Option value="engineering">Engineering</Option>
                      <Option value="humanResources">Human Resources</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="jobType"
                    label="Job Type"
                    rules={[
                      { required: true, message: 'Please Select Job Type!' },
                    ]}
                  >
                    <Select style={{ width: 300 }}>
                      <Option value="Full Time">Full Time</Option>
                      <Option value="Pass Time">Pass Time</Option>
                      <Option value="Remote">Internship</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="location"
                    label="Location"
                    rules={[
                      { required: true, message: 'Please Enter Job Location' },
                    ]}
                  >
                    <Input placeholder="address" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    name="shortDes"
                    label="Short Description"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Short Description',
                      },
                    ]}
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="jobDescription"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Job Description',
                      },
                    ]}
                  >
                    <CKEditor
                      type="string"
                      editor={ClassicEditor}
                      data={`${job.jobDescription}`}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setCkeditorData(data);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="skill"
                    label="Skills"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="skill" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="experience"
                    label="Experience"
                    rules={[{ required: false }]}
                  >
                    <Select style={{ width: 300 }}>
                      <Option value="Internship">Internship</Option>
                      <Option value="Entry level">Entry level</Option>
                      <Option value="Asociate">Asociate</Option>
                      <Option value="Mid-senior level">Mid-senior level</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={4}>
                  <Form.Item
                    name="minSalary"
                    label="Salary"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="minSalary" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    name="maxSalary"
                    label=" "
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="maxSalary" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                className="Detail-id"
                name="id"
                rules={[{ required: false }]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          )}
        </DrawerComponent>
      </div>
      <DetailJobComponent
        data={job}
        loading={loading}
        detailJobContentCenter="DetailJob-Content-center"
        detailJobHead="DetailJob-head"
        HeaderContent="DetailJob-container"
        detailJobContainer="DetailJob-container"
        detailJobContentRight="DetailJob-content-right"
        detailJobCreate="detailJob-create"
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(DetailRecruitPage);
