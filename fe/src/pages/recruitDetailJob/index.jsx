import React, { useEffect, useState } from 'react';
import DetailJobComponent from './component/detailJobComponent';
import { useParams } from 'react-router-dom';
import jobService from '../../services/jobService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  Button,
  Modal,
  Input,
  Form,
  Select,
  Popconfirm,
} from 'antd';
import { Link } from 'react-router-dom';

function DetailRecruitPage(props) {
  let { id } = useParams();
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataJobID, setDataJobID] = useState({});
  const [ckeditorData, setCkeditorData] = useState('');
  const navigate = useNavigate();

  const { Option } = Select;

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadDataJob();
  }, []);

  const loadDataJob = () => {
    jobService.getIdJobs(id).then((res) => {
      setDataJobID(res);
    });
  };

  const openModal = (id) => {
    formModal.setFieldsValue({
      id: dataJobID.id,
      title: dataJobID.title,
      jobDescription: dataJobID.jobDescription,
      jobType: dataJobID.jobType,
      location: dataJobID.location,
      experience: dataJobID.experience,
      skill: dataJobID.skill,
      minSalary: dataJobID.minSalary,
      maxSalary: dataJobID.maxSalary,
      department: dataJobID.department,
    });

    setVisible(true);
  };

  const onFinish = (values) => {
    const body = { ...values, jobDescription: ckeditorData };
    jobService.updateJobs(values.id, body).then((res) => {
      loadDataJob();
    });

    toast.success('Edit Job Detail Successful!', {
      autoClose: 3000,
    });
    handleCancel();
  };

  const handleDelete = (id) => {
    jobService.deleteJobs(id).then((res) => {
      loadDataJob();
      navigate('/recruit');
    });
    toast.success('Delete Job  Successful!', {
      autoClose: 3000,
    });
    handleCancel();
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
          <Button className="Recruit-button" onClick={() => openModal(id)}>
            Edit Detail
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(id)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        </div>
        <Modal
          title=" Edit Detail"
          visible={visible}
          onCancel={handleCancel}
          width={1200}
          footer={
            <Button type="primary" htmlType="submit" form="formModal">
              Save
            </Button>
          }
        >
          <div className="recruit-modal">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              form={formModal}
              name="formModal"
              onFinish={onFinish}
            >
              <div className="recruit-input-title">
                <Form.Item name="title" rules={[{ required: false }]}>
                  <Input placeholder="title" />
                </Form.Item>
              </div>

              <div className="recruit-modal_select">
                <div className="recruit-select-1">
                  {' '}
                  <h5>Department </h5>
                  <Form.Item name="department" rules={[{ required: false }]}>
                    <Select style={{ width: 300 }}>
                      <Option value="Administrtion">Administrtion</Option>
                      <Option value="Finance">Finance</Option>
                      <Option value="Maketing">Maketing</Option>
                      <Option value="Sale">Sale</Option>
                      <Option value="Dev">Dev</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="recruit-select-1">
                  {' '}
                  <h5>Job Type </h5>
                  <Form.Item name="jobType" rules={[{ required: false }]}>
                    <Select style={{ width: 300 }}>
                      <Option value="Full Time">Full Time</Option>
                      <Option value="Pass Time">Part Time</Option>
                      <Option value="Internship">Internship</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <h5>Add new location </h5>
              <Form.Item
                name="location"
                className="recruit-modal_location"
                rules={[{ required: false }]}
              >
                <Input placeholder="address" />
              </Form.Item>
              <h5>Description</h5>
              <Form.Item name="jobDescription" className="recruit-editor">
                <CKEditor
                  type="string"
                  className="recruit-editor_content"
                  editor={ClassicEditor}
                  data={`${dataJobID.jobDescription}`}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkeditorData(data);
                  }}
                />
              </Form.Item>
              <div className="recruit-modal-work">
                <div className="recruit-modal-skill">
                  <h5>Skills</h5>
                  <Form.Item name="skill" rules={[{ required: false }]}>
                    <Input placeholder="skill" />
                  </Form.Item>
                </div>

                <div className="recruit-modal-exp">
                  <h5>Experience </h5>
                  <Form.Item name="experience" rules={[{ required: false }]}>
                    <Select style={{ width: 300 }}>
                      <Option value="Internship">Internship</Option>
                      <Option value="Entry level">Entry level</Option>
                      <Option value="Asociate">Asociate</Option>
                      <Option value="Mid-senior level">Mid-senior level</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <h5>Salary</h5>
              <div className="recruit-modal-salary">
                <Form.Item
                  name="minSalary"
                  className="recruit-modal_location"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="minSalary" />
                </Form.Item>
                <div className="recruit-modal-iconRight">
                  <RightOutlined />
                </div>
                <Form.Item
                  name="maxSalary"
                  className="recruit-modal_location"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="maxSalary" />
                </Form.Item>
              </div>
              <Form.Item
                className="Detail-id"
                name="id"
                rules={[{ required: false }]}
              >
                <Input disabled />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <DetailJobComponent
        data={dataJobID}
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

export default DetailRecruitPage;
