import React, { useEffect, useState } from 'react';
import './style.css';
import moment from 'moment';

function DetailJobComponent(props) {
  const { data } = props;

  const current = new Date();

  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const create = moment.utc(data.createdAt).format('YYYY-MM-DD').toString();

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
          <h5>{data.department}</h5>
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
    </>
  );
}

export default DetailJobComponent;
