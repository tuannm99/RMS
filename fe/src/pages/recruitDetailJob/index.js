import React, { useEffect, useState } from 'react';
import DetailJobComponent from './component/detailJobComponent';
import { useParams, useHistory } from 'react-router-dom';
import jobService from '../../services/jobService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import {
  Breadcrumb,
  Button,
  Table,
  Space,
  Popconfirm,
  Modal,
  Input,
  InputNumber,
  Form,
  Select,
} from 'antd';
import { Link } from 'react-router-dom';

function DetailRecruitPage(props) {
  let { id } = useParams();
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataJobID, setDataJobID] = useState({});
  const [dataJob, setDataJob] = useState('');
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
    jobService.getIdJobs(id).then((res) => {
      formModal.setFieldsValue({
        id: res.id,
        title: res.title,
        description: res.description,
        description: res.description,
        typeTime: res.typeTime,
        address: res.address,
        exp: res.exp,
        skill: res.skill,
        minSalary: res.minSalary,
        maxSalary: res.maxSalary,
      });
    });
    setVisible(true);
  };

  const onFinish = (values) => {
    jobService.updateJobs(values.id, values).then((res) => {
      loadDataJob();
    });
    toast.success('Edit Job Detail Successful!', {
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
        <Button className="Recruit-button" onClick={() => openModal(id)}>
          Edit Detail
        </Button>
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
              <Form.Item name="title" rules={[{ required: false }]}>
                <div className="recruit-input-title">
                  <input placeholder="Enter a new job tittle"></input>
                </div>
              </Form.Item>

              <div className="recruit-modal_select">
                <div className="recruit-select-1">
                  {' '}
                  <h5>Department </h5>
                  <Form.Item name="typeJob" rules={[{ required: false }]}>
                    <Select defaultValue=" " style={{ width: 300 }}>
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
                    <Select defaultValue=" " style={{ width: 300 }}>
                      <Option value="Full Time">Full Time</Option>
                      <Option value="Pass Time">Part Time</Option>
                      <Option value="Internship">Internship</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <h5>Add new location </h5>
              <Form.Item
                name="address"
                className="recruit-modal_location"
                rules={[{ required: false }]}
              >
                <Input placeholder="address" />
              </Form.Item>
              <Form.Item name="description" className="recruit-editor">
                <h5>Description</h5>
                <CKEditor
                  type=""
                  className="recruit-editor_content"
                  editor={ClassicEditor}
                  data={`${dataJobID.description} </br></br></br></br></br></br></br>`}
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
              </Form.Item>
              <div className="recruit-modal-work">
                <div className="recruit-modal-skill">
                  <h5>Skills</h5>
                  <Form.Item name="Skill" rules={[{ required: false }]}>
                    <Input placeholder="skill" />
                  </Form.Item>
                </div>

                <div className="recruit-modal-exp">
                  <h5>Experience </h5>
                  <Form.Item name="exp" rules={[{ required: false }]}>
                    <Select defaultValue="" style={{ width: 300 }}>
                      <Option value="Internship">Internship</Option>
                      <Option value="Entry level">Entry level</Option>
                      <Option value="Asociate">Asociate</Option>
                      <Option value="Mid-senior level">Mid-senior level</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <h5>Salary</h5>
              <Input.Group compact>
                <Select defaultValue="1">
                  <Option value="1">Between</Option>
                  <Option value="2">Except</Option>
                </Select>
                <Input
                  name="minSalary"
                  style={{ width: 100, textAlign: 'center' }}
                  placeholder="Minimum"
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  name="maxSalary"
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                  placeholder="Maximum"
                />
              </Input.Group>
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
