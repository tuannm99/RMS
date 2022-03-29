import React from 'react';
import { Timeline, Tag, Rate } from 'antd';

function TimeLine(props) {
  return (
    <Timeline className="mt-32">
      <Timeline.Item>
        <div className="timeline-content">
          <div className="timeline-Content-job mb-16">
            Software Engineering
            <span> San Francisco, United States | Application #1</span>
          </div>
          <div className="mb-8">
            <Rate allowHalf defaultValue={2.5} />
          </div>
          <div className="mb-8">Offer Draft</div>
          <div className="mb-8">
            <Tag color="#87d068">#Active</Tag>{' '}
            <span>Last updated at Feb 28, 2022</span>
          </div>
          <div className="mb-8">Create At Feb 20 2022 2:45 PM</div>
        </div>
      </Timeline.Item>
      <Timeline.Item></Timeline.Item>
    </Timeline>
  );
}

export default TimeLine;
