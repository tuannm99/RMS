import React from 'react';
import './table.module.css';

function Table(props) {
  const styles = {
    table: {
      width: '100%',
      minWidth: '400px',
      borderSpacing: 0,
      transition: 'all 0.2s ease',
    },
    thead: {
      backgroundColor: '#3ec5d1',
      color: '#fff',
      fontWeight: 600,
      textAlign:"left",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,'Helvetica Neue', Arial, sans-serif",
      fontSize: '14px',
    },
  };
  return (
    <div className="table-wrapper">
      <table style={styles.table}>
        {props.headData && props.renderHead ? (
          <thead style={styles.thead}>
            <tr style={styles.tr}>
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
