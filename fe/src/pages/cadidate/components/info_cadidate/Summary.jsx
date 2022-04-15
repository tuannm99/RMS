import React, { useEffect } from 'react';
import {
  ContainerOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { Row, Col, Descriptions, Tag, Rate } from 'antd';
import { getAllInterviews } from '../../../../redux/stores/cadidate/actions';
import {
  cadidate,
  interviews,
} from '../../../../redux/stores/cadidate/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

function Summary(props) {
  const { getAllInterviews, cadidate, interviews } = props;

  useEffect(() => {
    getAllInterviews(cadidate?.id);
  }, [getAllInterviews, cadidate]);

  return (
    <Row>
      <Col span={24} className="offer-info">
        <ExceptionOutlined className="icon-des" />
        <Descriptions
          title="User Info"
          layout="vertical"
          labelStyle={{ color: '#607787', fontWeight: 400 }}
        >
          <Descriptions.Item label="Status">
            <Tag color="gold">Offer Draft</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Drafted By">
            <div className="text-bolder">Tuan Nguyuen</div>
          </Descriptions.Item>
          <Descriptions.Item label="Drafted On">
            <div className="text-bolder">Mar 03, 2022</div>
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
                {item.stage}
              </Col>
              <Col span={8} className="text-center">
                <Rate disabled={true} value={item.feedback.rate} />
              </Col>
              <Col span={8}>
                <span className="text-normal fr">
                  {item.feedback.overallRecommendation}
                </span>
              </Col>
            </Row>
          ))}
      </Col>
      <Col span={24} className="content-feedBack">
        <FileDoneOutlined className="icon-des" />
        <div className="lead-section-title">Comments</div>
        {interviews &&
          interviews.map((item) => {
            if (item?.feedback?.comment) {
              return (
                <Row className="content-feedBack-row" key={item.id}>
                  <Col span={24} className="text-normal">
                    {item.stage}
                  </Col>
                  <Col span={24}>
                    <span className="ml-8">- {item?.feedback?.comment}</span>
                  </Col>
                </Row>
              );
            }
          })}
      </Col>
    </Row>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  interviews: interviews,
});
const mapDispatchToProps = (dispatch) => ({
  getAllInterviews: (payload) => dispatch(getAllInterviews(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Summary);
