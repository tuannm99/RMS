import React from "react";
import { RightOutlined } from "@ant-design/icons";
function PublicPage(props) {
  const { data } = props;
  return (
    <>
      <div className={props.classContent}>
        <div className={props.title}>
          <h3>{data.title}</h3>
        </div>
        <div className={props.classDes}>
          <span>{data.des}</span>
        </div>
        <div className={props.classAddress}>
          <span>{data.address}</span>
        </div>
        <div className={props.classTypeTime}>
          <span>{data.typeTime}</span>
        </div>
        <div className="public-icon">
          <RightOutlined style={{ fontSize: "23px", color: "#7b40a0" }} />
        </div>
      </div>
    </>
  );
}

export default PublicPage;
