import React from 'react';
function PublicPage(props) {
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className={props.classContent}>
        <div className={props.title}>
          <h3>{data.title}</h3>
        </div>
        <div className={props.classDes}>{data.shortDes}</div>
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
