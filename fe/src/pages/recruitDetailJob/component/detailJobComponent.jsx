import React, { useEffect, useState } from 'react';
import './style.css';
import moment from 'moment';
import { Spin, Col } from 'antd';

function DetailJobComponent(props) {
  const { data, loading } = props;
  const DEPARTMENT = {
    administration: 'Administration',
    sale: 'Sale',
    humanResources: 'Human Resources',
    engineering: 'Engineering',
    marketing: 'Marketing',
    finance: 'Finance',
    engineering: 'Engineering',
  };

  const beautyDepartment = (val) => {
    let newVal;
    Object.keys(DEPARTMENT).forEach((key) => {
      if (key === val) {
        newVal = DEPARTMENT[key];
      }
    });
    return newVal;
  };

  return (
    <>
      {loading ? (
        <Col style={{ textAlign: 'center' }} span={24}>
          <Spin tip="loading..." />
        </Col>
      ) : (
        <div>
          <div className={props.detailJobContentCenter}>
            <div className={props.detailJobHead}>
              <h5>Job Title</h5>
              <p>{data.title}</p>
            </div>
            <div className={props.detailJobContainer}>
              <h5>Job Description</h5>
              <div
                dangerouslySetInnerHTML={{ __html: data.jobDescription }}
              ></div>
              <h5>Skills</h5>
              <span>{data.skill}</span>
            </div>
          </div>
          <div className={props.detailJobContentRight}>
            <h1>Job Posting Details</h1>
            <p>Department</p>
            <h5>{beautyDepartment(data.department)}</h5>
            <p>Experience</p>
            <h5>{data.experience}</h5>
            <p>Location</p>
            <h5>{data.location}</h5>
            <p>Job Type</p>
            <h5>{data.jobType}</h5>
            <p>Salary</p>
            <h5>
              $: {data.minSalary} - {data.maxSalary}
            </h5>
            <div className={props.detailJobCreate}>
              Create At: &nbsp;
              {data.createdAt
                ? moment.utc(data.createdAt).format('YYYY-MM-DD').toString()
                : '-'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailJobComponent;
