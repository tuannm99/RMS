import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import Recruit from '../../components/recruit';
import './style.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Breadcrumb, Modal, Input, Form, Select } from 'antd';

function RecruitPage(props) {
  const [dataJob, setdataJob] = useState([]);
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  useEffect(() => {
    loadDataJobs();
  }, []);

  const loadDataJobs = () => {
    jobService.getListJobs().then((res) => {
      setdataJob(res);
      console.log(res);
    });
  };

  const colStyles = {
    flexBasis: '20%',
    width: '20%',
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const createJob = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataJob.length + 1,
    });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    const index = dataJob.findIndex((item) => item.id === values.id);
    console.log(values);
    if (index > -1) {
      jobService.createJobs(values.id, values).then((res) => {
        console.log(res);
        loadDataJobs();
      });
    } else {
      jobService.createJobs(values).then((res) => {
        console.log(res);
        loadDataJobs();
      });
    }
    handleCancel();
  };
  
  const openPreview = () => {
    formModal.setFieldsValue({
      id: dataJob.length + 1,
    });
    setVisible(true);
  };
  
  const handleData = (item) => {
    localStorage.setItem('job', JSON.stringify(item));
    console.log(localStorage);
  };
  return (
    <>
      <div className="Recruit-head">
        <Breadcrumb>
          <Breadcrumb.Item>Recruitment</Breadcrumb.Item>
          <Breadcrumb.Item>Recruit</Breadcrumb.Item>
        </Breadcrumb>
        <Button className="Recruit-button" onClick={createJob}>
          Add Job Posting
        </Button>
        <Modal
          title="What's the job you're hiring for?"
          visible={visible}
          onCancel={handleCancel}
          width={1200}
          footer={
            <>
              <Button onClick={openPreview}>Preview</Button>

              <Button type="primary" htmlType="submit" form="formModal">
                Save
              </Button>
            </>
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
                    <Select
                      defaultValue=" "
                      style={{ width: 300 }}
                      onChange={handleChange}
                    >
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
                  <Form.Item name="typeTime" rules={[{ required: false }]}>
                    <Select
                      defaultValue=" "
                      style={{ width: 300 }}
                      onChange={handleChange}
                    >
                      <Option value="Full Time">Full Time</Option>
                      <Option value="Pass Time">Pass Time</Option>
                      <Option value="Internship">Internship</Option>
                      <Option value="Fixed Term Contract">
                        Fixed Term Contract
                      </Option>
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
                  name="description"
                  editor={ClassicEditor}
                  data="</br></br></br></br></br></br></br>"
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
                  <Form.Item name="Exp" rules={[{ required: false }]}>
                    <Select
                      defaultValue=" "
                      style={{ width: 300 }}
                      onChange={handleChange}
                    >
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
                  className="site-input-right"
                  style={{
                    width: 100,
                    textAlign: 'center',
                  }}
                  placeholder="Maximum"
                />
              </Input.Group>
            </Form>
          </div>
        </Modal>
      </div>

      <Row type="flex" gutter={30}>
        {dataJob.map((item) => {
          return (
            <Col className="recuid-card" key={item.id} style={{ ...colStyles }}>
              <Recruit
                data={item}
                cardJD="card-jd"
                cartHeader="cart-header"
                cartTitle="cart-title"
                cartContent="cart-content"
                cartLocal="cart-local"
                cartIcon="cart-icon"
                cartFooter="cart-footer"
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default RecruitPage;
