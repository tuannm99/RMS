import React from 'react';

import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function DetailPublic(props) {
  const { data } = props;
  return (
    <>
      <div className={props.detailHeader}>
        <div className={props.HeaderContent}>
          <div className={props.detailHeaderLeft}>
            <div className="public-header-sub">
              <Link to={`/career`}>
                <FaArrowLeft className="public-header-icon" />
              </Link>
              <h3>{data.department}</h3>
            </div>
            <h1>{data.title}</h1>
            <div className={props.detailHeaderSub}>
              <span>{data.location}</span> | <span>{data.jobType}</span>
            </div>
          </div>
          <div className={props.detailHeaderRight}>
            <button onClick={props.handleAddCandidate}>Apply Now</button>
          </div>
        </div>
      </div>
      <div className={props.detailPublicContent}>
        <span>{data.description}</span>
        <div className={props.detailContentList}>
          <span
            dangerouslySetInnerHTML={{ __html: data.jobDescription }}
          ></span>
        </div>
      </div>
    </>
  );
}

export default DetailPublic;
