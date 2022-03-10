import React, { useEffect, useState } from 'react';

import Recruit from '../../components/recruit';
import './style.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { selectJobs, selectLoading } from '../../redux/stores/job/selectors';
import * as actions from '../../redux/stores/job/actions';
import { createJobs, getJobsRequestService } from '../../services/jobService';
import { Row, Col, Button, Breadcrumb, Modal, Input, Form, Select } from 'antd';

function RecruitPage(props) {
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { Option } = Select;
  const [ckeditorData, setCkeditorData] = useState('');
  const { getJobs, selectJobs } = props;

  useEffect(() => {
    getJobs();
  }, []);

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
      id: selectJobs.length + 1,
    });
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    const body = { ...values, jobDescription: ckeditorData };
    await createJobs(values);
    console.log(values);
    getJobs();
    toast.success('Create Job Successful!', {
      autoClose: 3000,
    });
    handleCancel();
  };

  const openPreview = () => {
    formModal.setFieldsValue({
      id: selectJobs.length + 1,
    });
    setVisible(true);
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
              <Button onClick={openPreview} form="formModal">
                Preview
              </Button>

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
                  <Form.Item name="department" rules={[{ required: false }]}>
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
                  <Form.Item name="jobType" rules={[{ required: false }]}>
                    <Select
                      defaultValue=" "
                      style={{ width: 300 }}
                      onChange={handleChange}
                    >
                      <Option value="Full Time">Full Time</Option>
                      <Option value="Pass Time">Pass Time</Option>
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
              <Form.Item name="jobDescription" className="recruit-editor">
                <CKEditor
                  type="string"
                  className="recruit-editor_content"
                  editor={ClassicEditor}
                  data={`${selectJobs.jobDescription}`}
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
              <div className="recruit-modal-salary">
                <Form.Item
                  name="minSalary"
                  className="recruit-modal_location"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="minSalary" />
                </Form.Item>
                <Form.Item
                  name="maxSalary"
                  className="recruit-modal_location"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="maxSalary" />
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </div>

      <Row type="flex" gutter={30}>
        {selectJobs.map((item) => {
          return (
            <Col className="recuid-card" key={item.id} style={{ ...colStyles }}>
              <Recruit
                data={item}
                jobId={item.id}
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

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  selectJobs: selectJobs,
});

const mapDispatchToProps = (dispatch) => ({
  getJobs: (payload) => dispatch(actions.getJobs(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RecruitPage);
