import React from 'react';
import { RightOutlined } from '@ant-design/icons';
function PublicPage(props) {
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className={props.classContent}>
        <div className={props.title}>
          <h3>{data.title}</h3>
        </div>
        <div className={props.classDes}>
          <span
            dangerouslySetInnerHTML={{ __html: data.jobDescription }}
          ></span>
        </div>
        <div className={props.classAddress}>
          <span>{data.location}</span>
        </div>
        <div className={props.classTypeTime}>
          <span>{data.jobType}</span>
        </div>
      </div>
    </>
  );
}

export default PublicPage;
