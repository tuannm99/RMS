import React, { useEffect, useState } from 'react';
import { Col, Modal, Row, Form, Input, Select, Rate, Button, Tag } from 'antd';
import { getAllInterviews } from '../../../../redux/stores/cadidate/actions';
import { cadidate } from '../../../../redux/stores/cadidate/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  getDetailInterviewsServices,
  updateIntervierServices,
} from '../../../../services/cadidateServices';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
const { Option } = Select;

function UpdateFeedBack(props) {
  const {
    isModalVisible,
    handleOk,
    handleCancel,
    cadidate,
    getAllInterviews,
    interviewer,
    account,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (interviewer?.id) {
      getDetailInterviewsServices(cadidate?.id, interviewer?.id).then((res) => {
        form.setFieldsValue({
          overallRecommendation: res.data.feedback.overallRecommendation,
          rate: res.data.feedback.rate,
          comment: res.data.feedback.comment,
        });
      });
    }
  }, [interviewer?.id, cadidate?.id, form]);

  const onFinish = async (values) => {
    let body = {
      feedback: {
        overallRecommendation: values?.overallRecommendation,
        rate: values?.rate,
        comment: values?.comment,
      },
    };
    const resEdit = await updateIntervierServices(
      cadidate?.id,
      interviewer?.id,
      body
    );
    if (hasResponseError(resEdit)) {
      toast.error(resEdit.data.message);
      return;
    }
    toast.success('Thank you for your feedback!');
    await getAllInterviews(cadidate?.id);
    handleCancel();
  };

  return (
    <Modal
      title="Interview Feedback"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="overallRecommendation"
              label="Overall Recommendation"
              rules={[{ required: true, message: 'Please choose enum' }]}
            >
              <Select
                placeholder="Please choose the approver"
                bordered={false}
                showArrow={false}
                disabled={
                  account?.role === 'hiringManager' ||
                  account?.id === interviewer?.interviewer?.id
                    ? false
                    : true
                }
              >
                <Option value="notYet">
                  <Tag color="red">Not Yet</Tag>
                </Option>
                <Option value="hire">
                  <Tag color="green">Hire</Tag>
                </Option>
                <Option value="noHire">
                  <Tag color="magenta">No Hire</Tag>
                </Option>
                <Option value="strongHire">
                  <Tag color="orange">Strong Hire</Tag>
                </Option>
                <Option value="strongNoHire">
                  <Tag color="purple">Strong No Hire</Tag>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="rate" label="Rate">
              <Rate
                disabled={
                  account?.role === 'hiringManager' ||
                  account?.id === interviewer?.interviewer?.id
                    ? false
                    : true
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="comment" label="Comment">
              <Input.TextArea
                rows={4}
                placeholder="Note"
                disabled={
                  account?.role === 'hiringManager' ||
                  account?.id === interviewer?.interviewer?.id
                    ? false
                    : true
                }
              />
            </Form.Item>
          </Col>
          {(account?.role === 'hiringManager' ||
            account?.id === interviewer?.interviewer?.id) && (
            <Col span={24}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  account: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  getAllInterviews: (payload) => dispatch(getAllInterviews(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UpdateFeedBack);
