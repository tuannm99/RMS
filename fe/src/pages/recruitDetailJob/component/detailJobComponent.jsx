import React from 'react';

import { Row, Col, Button, Breadcrumb, Modal, Input, Form, Select } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
function DetailJobComponent(props) {
  const { data } = props;
  return (
    <>
      <div>
        <div className={props.detailJobContentCenter}>
          <div className={props.detailJobHead}>
            <h5>Job Title</h5>
            <p>{data.title}</p>
          </div>
          <div className={props.detailJobContainer}>
            <h5>Job Description</h5>
            <span>{data.jobDescription}</span>
            <h5>Skills</h5>
            <span>{data.skill}</span>
          </div>
        </div>
        <div className={props.detailJobContentRight}>
          <h1>Job Posting Details</h1>
          <p>Department</p>
          <h5>{data.department}</h5>
          <p>Experience</p>
          <h5>{data.exp}</h5>
          <p>Location</p>
          <h5>{data.location}</h5>
          <p>Job Type</p>
          <h5>{data.jobType}</h5>
          <p>Salary</p>
          <h5>
            AED: {data.minSalary} - {data.maxSalary}
          </h5>
          <div className={props.detailJobCreate}>
            Create on February 11th 2022 , at 3.34 pm (17 days ago)
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailJobComponent;
