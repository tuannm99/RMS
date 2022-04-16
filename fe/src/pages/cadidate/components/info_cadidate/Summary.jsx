import React, { useEffect } from 'react';
import {
  ContainerOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import { Row, Col, Descriptions, Tag, Rate, Spin } from 'antd';
import { getAllInterviews } from '../../../../redux/stores/cadidate/actions';
import {
  cadidate,
  interviews,
  loadingInterviews,
  loadingCadidate,
} from '../../../../redux/stores/cadidate/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';

function Summary(props) {
  const {
    getAllInterviews,
    cadidate,
    interviews,
    loadingInterviews,
    loadingCadidate,
  } = props;

  useEffect(() => {
    getAllInterviews(cadidate?.id);
  }, [getAllInterviews, cadidate?.id]);

  console.log(cadidate);

  return (
    <Row>
      {(loadingCadidate || loadingInterviews) && (
        <Col span={24} style={{ textAlign: 'center' }}>
          <Spin />
        </Col>
      )}
      {!loadingInterviews && !loadingCadidate && (
        <>
          <Col span={24} className="offer-info">
            <ExceptionOutlined className="icon-des" />
            <Descriptions
              title="User Info"
              layout="vertical"
              labelStyle={{ color: '#607787', fontWeight: 400 }}
            >
              <Descriptions.Item label="Status">
                {cadidate?.status === 'male' ? (
                  <Tag color="green">open</Tag>
                ) : cadidate?.status === 'female' ? (
                  <Tag color="red">reject</Tag>
                ) : (
                  <Tag color="geekblue">approve</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Drafted By">
                <div className="text-bolder">{cadidate?.referral}</div>
              </Descriptions.Item>
              <Descriptions.Item label="Create At">
                <div className="text-bolder">
                  {moment(cadidate?.createAt).utc().format('YYYY-MM-DD')}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24} className="content-feedBack pb-32">
            <div className="lead-section-title">Feedback Snapshot</div>
            <ContainerOutlined className="icon-des" />
            {interviews &&
              interviews.map((item) => (
                <Row className="content-feedBack-row" key={item.id}>
                  <Col span={8} className="text-normal">
                    <span style={{ position: 'absolute', bottom: '3px' }}>
                      {item.stage}
                    </span>
                  </Col>
                  <Col span={8} className="text-center">
                    <Rate disabled={true} value={item.feedback.rate} />
                  </Col>
                  <Col span={8}>
                    <span
                      className="text-normal"
                      style={{ position: 'absolute', bottom: '3px', right: 0 }}
                    >
                      {item.feedback.overallRecommendation}
                    </span>
                  </Col>
                </Row>
              ))}
          </Col>
          <Col span={24} className="content-feedBack">
            <FileDoneOutlined className="icon-des" />
            <div className="lead-section-title">Employee</div>
            <Row className="content-feedBack-row">
              <Col
                span={24}
                className="ml-8"
                style={{ color: '#607787', fontWeight: 400 }}
              >
                Designation
              </Col>
              <Col className="ml-16 text-normal mb-20" span={24}>
                {cadidate?.employer?.designation ? (
                  <span>{cadidate?.employer?.designation}</span>
                ) : (
                  <span>-</span>
                )}
              </Col>
              <Col
                span={24}
                className="ml-8"
                style={{ color: '#607787', fontWeight: 400 }}
              >
                Bussiness Name
              </Col>
              <Col className="ml-16 text-normal" span={24}>
                {cadidate?.employer?.bussinessName ? (
                  <span>{cadidate?.employer?.bussinessName}</span>
                ) : (
                  <span>-</span>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={24} className="content-feedBack">
            <FileProtectOutlined className="icon-des" />
            <div className="lead-section-title">Education</div>
            <Row className="content-feedBack-row">
              <Col
                span={24}
                className="ml-8"
                style={{ color: '#607787', fontWeight: 400 }}
              >
                Degree
              </Col>
              <Col className="ml-16 text-normal mb-20" span={24}>
                {cadidate?.education?.degree ? (
                  <span>{cadidate?.education?.degree}</span>
                ) : (
                  <span>-</span>
                )}
              </Col>
              <Col
                span={24}
                className="ml-8"
                style={{ color: '#607787', fontWeight: 400 }}
              >
                University
              </Col>
              <Col className="ml-16 text-normal" span={24}>
                {cadidate?.education?.universityName ? (
                  <span>{cadidate?.education?.universityName}</span>
                ) : (
                  <span>-</span>
                )}
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  interviews: interviews,
  loadingInterviews: loadingInterviews,
  loadingCadidate: loadingCadidate,
});
const mapDispatchToProps = (dispatch) => ({
  getAllInterviews: (payload) => dispatch(getAllInterviews(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Summary);
