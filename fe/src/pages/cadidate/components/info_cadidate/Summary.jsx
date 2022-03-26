import React from 'react';
import {
  ContainerOutlined,
  ExceptionOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { Row, Col, Descriptions, Tag } from 'antd';

function Summary(props) {
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
      <Col span={24} className="content-feedBack">
        <div className="lead-section-title">Feedback Snapshot</div>
        <ContainerOutlined className="icon-des" />
        <div className="content-feedBack-row">
          <div className="text-normal">Job Fitment Rating</div>
          <div> 5 | Exceptional</div>
          <div>View</div>
        </div>
        <div className="content-feedBack-row">
          <div className="text-normal">Job Fitment Rating</div>
          <div> 5 | Exceptional</div>
          <div>View</div>
        </div>
        <div className="content-feedBack-row">
          <div className="text-normal">Job Fitment Rating</div>
          <div> 5 | Exceptional</div>
          <div>View</div>
        </div>
      </Col>
      <Col span={24} className="content-feedBack">
        <FileDoneOutlined className="icon-des" />
        <div className="lead-section-title">Experience</div>
        <div className="content-feedBack-row">
          <div>Total Experience</div>
          <div>-</div>
          <div>-</div>
        </div>
      </Col>
    </Row>
  );
}

export default Summary;
