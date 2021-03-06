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
import {
  getAllJobs,
  deleteJobs,
  deleteJobsHard,
} from '../../services/jobService';
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
  Modal,
} from 'antd';

function RecruitPage(props) {
  const [dataJobs, setDataJobs] = useState();
  const { Option } = Select;
  const { userAccount } = props;
  const [valueSelect, setValueSelect] = useState(null);
  const [param, setParam] = useState({
    limit: 12,
    page: 1,
  });

  const { setJobId, visibleAddJob, setVisibleAddJob } = props;
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formModal] = Form.useForm();
  const [ckeditorData, setCkeditorData] = useState('');
  const { TextArea } = Input;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);

  const DEPARTMENT = {
    administration: 'Administration',
    sale: 'Sale',
    humanResources: 'Human Resources',
    engineering: 'Engineering',
    marketing: 'Marketing',
    finance: 'Finance',
    engineering: 'Engineering',
  };

  const OPTIONS_SKILL = [
    '  NODEJS',
    '  GAAP',
    '  SCRUM',
    '  MONGODB',
    '  MS-OFFICE',
    '  IDE',
    '  REACTJS',
    '  FIXBUG',
    '  TRAINING',
    '  MANAGEUSER',
    '  CONFIGURATION',
    '  NEW-TECHNOLOGIES',
    '  MICROSOFT-OFFICE',
    '  LEADER',
    '  PHP',
    '  JAVA',
    '  HTML',
    '  CSS',
    '  REACT-NATIVE',
    '  WEB-APP',
  ];

  const OPTIONS_JOB_TYPE = [
    '   Full Time',
    '   Part Time',
    '   Seasonal',
    '   Remote',
  ];

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
    setValueSelect(value);
    if (value === 'allJob') {
      const obj = { ...param, page: 1 };
      delete obj['status'];
      setParam(obj);
    } else {
      setParam({
        ...param,
        status: value,
        page: 1,
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
        toast.error(`${res.data.message}`);
        return;
      }
      setDataJobs(res.data);
      setLoading(false);
    });
  };

  const handleDelete = async (id) => {
    if (valueSelect === 'deleted') {
      const res = await deleteJobsHard(id);
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`);
        return;
      }
      toast.success('Delete Job Detail Successful!', {
        autoClose: 3000,
      });
    } else {
      const res = await deleteJobs(id);
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`);
        return;
      }
      toast.success('Move the job to deleted state Successful!', {
        autoClose: 3000,
      });
    }

    if (
      dataJobs?.totalResults >= param.limit &&
      dataJobs?.totalResults % param.limit === 1
    ) {
      setParam({ ...param, page: dataJobs?.page - 1 });
    } else {
      setParam({ ...param });
    }
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
        toast.error(`${res.data.message}`);
        return;
      }
      formModal.resetFields();
      toast.success('Create Job Successful!', {
        autoClose: 3000,
      });
      loadDataJobs();
      onclose();
    });
  };

  const handleChangeItem = () => {
    setSelectedItems(selectedItems);
  };

  const handleChangeJobType = () => {
    setSelectedJobType(selectedJobType);
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
          <Option value="deleted">Deleted</Option>
        </Select>
        <div>
          <Link to={`/career`} target="_blank" className="mr-12">
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
                xxl={{ span: 4 }}
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
                        <Link to={`/career/${item.id}`} target="_blank">
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
                        {item.jobType && <span>{item.jobType[0]}</span>}
                      </div>
                    </div>
                    {userAccount.role === 'hiringManager' &&
                      (valueSelect !== 'deleted' ? (
                        <Popconfirm
                          title="Sure to delete?"
                          onConfirm={() => handleDelete(item.id)}
                        >
                          <FaTimes className="recruit-card-icons" />
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="Delete all information related to this job!"
                          onConfirm={() => handleDelete(item.id)}
                        >
                          <FaTimes className="recruit-card-icons" />
                        </Popconfirm>
                      ))}
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
                  <Option value="administration">Administration</Option>
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
                rules={[{ required: true, message: 'Please Select Job Type!' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedJobType}
                  onChange={handleChangeJobType}
                  style={{ width: '100%' }}
                >
                  {OPTIONS_JOB_TYPE.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
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
              <Form.Item name="skill" label="Skills">
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={handleChangeItem}
                  style={{ width: '100%' }}
                >
                  {OPTIONS_SKILL.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
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
                rules={[{ required: true, message: 'Please Enter min salary' }]}
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
              <Form.Item name="maxSalary" label=" ">
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
