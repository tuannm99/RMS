import React, { useEffect, useState, useRef } from 'react';
import DetailJobComponent from './component/detailJobComponent';
import { useParams } from 'react-router-dom';
import {
  getJobsDetail,
  updateJobs,
  deleteJobs,
} from '../../services/jobService';
import JobEdit from './component/editJob';
import { DrawerComponent } from '../../components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Input,
  Form,
  Select,
  Col,
  Row,
  Drawer,
} from 'antd';
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

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchJob();
  }, [job]);

  const fetchJob = async () => {
    const jobDetail = await getJobsDetail(id);
    setJob(jobDetail.data);
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

    updateJobs(jobValue.id, body)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => console.log(err));
    toast.success('Edit Job Detail Successful!', {
      autoClose: 3000,
    });

    handleCancel();
  };

  const updateStatus = (value) => {
    const body = { status: value };
    updateJobs(id, body)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => console.log(err));
    toast.success('update Status!', {
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
            <Option value="published">Published</Option>
            <Option value="onHold">Hode On</Option>
            <Option value="deleted">Delete</Option>
          </Select>
        </div>

        <DrawerComponent title="Edit Job" onClose={onclose} visible={visible}>
          <Form
            layout="vertical"
            hideRequiredMark
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
                    { required: true, message: 'Please enter user name' },
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="department"
                  rules={[{ required: false }]}
                  label="Department"
                >
                  <Select style={{ width: 300 }}>
                    <Option value="Administrtion">Administrtion</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Maketing">Maketing</Option>
                    <Option value="Sale">Sale</Option>
                    <Option value="Dev">Dev</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="jobType"
                  label="Job Type"
                  rules={[{ required: false }]}
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
                  rules={[{ required: false }]}
                >
                  <Input placeholder="address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="jobDescription" label="Description">
                  <CKEditor
                    type="string"
                    editor={ClassicEditor}
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </DrawerComponent>
      </div>
      <DetailJobComponent
        data={job}
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
