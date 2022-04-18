import React from 'react';
import './table.css';

function Table(props) {
  return (
    <div className="table-wrapper">
      <table className="table">
        {props.headData && props.renderHead ? (
          <thead>
            <tr>
              {props.headData.map((item, index) =>
                props.renderHead(item, index)
              )}
            </tr>
          </thead>
        ) : null}
        {props.bodyData && props.renderBody ? (
          <tbody>
            {props?.bodyData?.map((item, index) =>
              props.renderBody(item, index, props.jobs)
            )}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Table;
