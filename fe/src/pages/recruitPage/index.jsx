import React, { useEffect, useState } from 'react';
import './style.css';
import { hasResponseError } from '../../utils/utils';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getAllJobs, deleteJobs } from '../../services/jobService';
import * as action from '../../redux/stores/job/actions';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createJobs } from '../../services/jobService';
import { DrawerComponent } from '../../components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaTimes } from 'react-icons/fa';
import { setVisibleAddJob } from '../../redux/stores/job/actions';
import { visibleAddJob } from '../../redux/stores/job/selectors';

import {
  Popconfirm,
  Button,
  Breadcrumb,
  Select,
  Pagination,
  Card,
  Progress,
  Divider,
  Col,
  Row,
  Form,
  Input,
  Spin,
} from 'antd';

function RecruitPage(props) {
  const [dataJobs, setDataJobs] = useState();
  const { Option } = Select;
  const { userAccount } = props;
  const [param, setParam] = useState({
    limit: 10,
    page: 1,
  });

  const { setJobId, visibleAddJob, setVisibleAddJob } = props;
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formModal] = Form.useForm();
  const [ckeditorData, setCkeditorData] = useState('');
  const { TextArea } = Input;
  const DEPARTMENT = {
    administration: 'Administration',
    sale: 'Sale',
    humanResources: 'Human Resources',
    engineering: 'Engineering',
    marketing: 'Marketing',
    finance: 'Finance',
    engineering: 'Engineering',
  };

  const beautyDepartment = (val) => {
    let newVal;
    Object.keys(DEPARTMENT).forEach((key) => {
      if (key === val) {
        newVal = DEPARTMENT[key];
      }
    });
    return newVal;
  };

  function handleChange(value) {
    if (value === 'allJob') {
      const obj = { ...param };
      delete obj['status'];
      setParam(obj);
    } else {
      setParam({
        ...param,
        status: value,
      });
    }
  }

  useEffect(() => {
    loadDataJobs(param);
  }, [param]);

  const loadDataJobs = (param) => {
    setLoading(true);
    getAllJobs(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataJobs(res.data);
      setLoading(false);
    });
  };

  const handleDelete = (id) => {
    deleteJobs(id).then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`, {
          autoClose: 3000,
        });
      } else {
        toast.success('Delete Job Successful!', {
          autoClose: 3000,
        });
        loadDataJobs();
      }
    });
  };

  const handleChangeData = (pagination) => {
    console.log(pagination);
    setParam({ ...param, page: pagination });
    loadDataJobs({ ...param, page: pagination });
  };

  const onclose = () => {
    setVisibleAddJob(false);
  };

  const showDrawp = () => {
    setVisibleAddJob(true);
  };

  const handleLinkCadidate = async (id) => {
    await setJobId(id);
    navigation('/candidate');
  };

  const onFinish = (values) => {
    const body = { ...values, jobDescription: ckeditorData };
    createJobs(body).then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      toast.success('Create Job Successful!', {
        autoClose: 3000,
      });
      loadDataJobs();
      onclose();
    });
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Breadcrumb>
            <Breadcrumb.Item>Recruitment</Breadcrumb.Item>
            <Breadcrumb.Item>Recruit</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={12}>
          {dataJobs && (
            <Pagination
              pageSize={dataJobs?.limit}
              current={dataJobs?.page}
              total={dataJobs?.totalResults}
              onChange={handleChangeData}
              className="fr"
            />
          )}
        </Col>
      </Row>
      <Divider className="mb-0 mt-12" />
      <div className="function-header">
        <Select
          defaultValue="allJob"
          style={{ width: 120 }}
          onSelect={handleChange}
          className="mb-12"
        >
          <Option value="allJob">All Job</Option>
          <Option value="published">Published</Option>
          <Option value="onHold">Hode On</Option>
          <Option value="deleted">deleted</Option>
        </Select>
        <div>
          <Link to={`/Career`} target="_blank" className="mr-12">
            <Button type="primary">Career</Button>
          </Link>
          <Button
            className="fr"
            onClick={showDrawp}
            disabled={userAccount.role !== 'hiringManager' && true}
          >
            Create Job
          </Button>
        </div>
      </div>
      <Row gutter={20}>
        {loading && (
          <Col style={{ textAlign: 'center' }} span={24}>
            <Spin tip="loading..." />
          </Col>
        )}
        {dataJobs &&
          !loading &&
          dataJobs?.results?.map((item) => {
            return (
              <Col
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 3 }}
                key={item.id}
                className="mb-24"
              >
                <div className="card">
                  <Card
                    className="card-effect"
                    style={{
                      width: '100%',
                      minHeight: '350px',
                      textAlign: 'center',
                    }}
                    hoverable="true"
                    title={
                      <div onClick={() => handleLinkCadidate(item.id)}>
                        {beautyDepartment(item.department)}
                      </div>
                    }
                    actions={[
                      item.status === 'published' ? (
                        <Link to={`/Career/${item.id}`} target="_blank">
                          <div>
                            <GlobalOutlined key="global" className="mr-8" />
                            {item.status}
                          </div>
                        </Link>
                      ) : (
                        <div>
                          <GlobalOutlined key="global" className="mr-8" />
                          {item.status}
                        </div>
                      ),

                      <Link to={`/recruit/${item.id}`}>
                        <div>Details</div>
                      </Link>,
                    ]}
                  >
                    <div
                      className="body-card"
                      onClick={() => handleLinkCadidate(item.id)}
                    >
                      <p className="title-card mb-16">{item.title}</p>
                      <Progress
                        type="circle"
                        percent={100}
                        format={() => `${item.candidateCount} candidates`}
                        width={120}
                        strokeWidth={4}
                        strokeColor={'#9e80c5'}
                        trailColor={'#607787'}
                        status="normal"
                      />
                      <div className="location mt-16">
                        {item.location && (
                          <span>
                            <UserOutlined /> {item.location} |{' '}
                          </span>
                        )}
                        {item.jobType && <span>{item.jobType}</span>}
                      </div>
                    </div>
                    {userAccount.role === 'hiringManager' && (
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(item.id)}
                      >
                        <FaTimes className="recruit-card-icons" />
                      </Popconfirm>
                    )}
                  </Card>
                </div>
              </Col>
            );
          })}
      </Row>
      <DrawerComponent
        title="Create Job"
        onClose={onclose}
        visible={visibleAddJob}
        width={720}
      >
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
                label="Job Title"
                rules={[{ required: true, message: 'Please Enter Job Title' }]}
              >
                <Input placeholder="Please Enter Job Title" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  { required: true, message: 'Please Select Department' },
                ]}
              >
                <Select style={{ width: 300 }}>
                  <Option value="administration">Administrtion</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="marketing">Maketing</Option>
                  <Option value="sale">Sale</Option>
                  <Option value="engineering">Engineering</Option>
                  <Option value="humanResources">HumanResources</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="jobType"
                label="Job Type"
                rules={[{ required: true, message: 'Please Select Job Type!' }]}
              >
                <Select style={{ width: 300 }}>
                  <Option value="Full Time">Full Time</Option>
                  <Option value="Part Time">Part Time</Option>
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
              <Form.Item name="shortDes" label="Short Description">
                <TextArea rows={4} />
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
            <Form.Item
              className="Detail-id"
              name="id"
              rules={[{ required: false }]}
            >
              <Input disabled />
            </Form.Item>
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
  visibleAddJob: visibleAddJob,
});

const mapDispatchToProps = (dispatch) => ({
  setJobId: (payload) => dispatch(action.setJobId(payload)),
  setVisibleAddJob: (payload) => dispatch(setVisibleAddJob(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RecruitPage);
