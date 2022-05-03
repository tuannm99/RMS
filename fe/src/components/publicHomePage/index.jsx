import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
function PublicPage(props) {
  const { data } = props;

  return (
    <>
      <div className={props.classContent}>
        <div className={props.title}>
          <h3>{data.title}</h3>
        </div>
        <p className={props.classDes}>{data.shortDes}</p>
        <MdLocationOn className="public-detail-icon" />
        <div className={props.classAddress}>
          <span>Available in: &nbsp;{data.location}</span>
        </div>
        <div className={props.classTypeTime}>
          <button className="btn-public">Learn more</button>
        </div>
      </div>
    </>
  );
}

export default PublicPage;
