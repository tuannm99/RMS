import { Select } from 'antd';
import moment from 'moment';

const { Option } = Select;
const current = new Date();

const styles = {
  tr: {
    textAlign: 'left',
  },
  td: {
    backgroundCcolor: '#fff',
    color: '#12344d',
    fontWeight: 500,
    textTransform: 'capitalize',
    padding: '10px 10px',
  },
  th: {
    textTransform: 'capitalize',
    padding: '12px 10px',
  },
};

export const renderHeadTable = (item, index) => (
  <th style={styles.th} key={index}>
    {item}
  </th>
);

export const customerTableHead = ['Candidate', 'interviewer', 'Schedule info'];

export const renderBodyTable = (item, index, navigate) =>
  item.candidateId != null && (
    <tr key={item.id} style={styles.tr}>
      <td style={styles.td}>{item.candidateId.fullName}</td>
      {item.interviewer != null ? (
        <td
          className="pl-8 cu"
          style={{ ...styles.td, color: '#2c5cc5', cursor: 'pointer' }}
          onClick={() => {
            navigate(`/profile/${item.interviewer.id}`);
          }}
        >
          {item.interviewer.fullName}
        </td>
      ) : (
        <td></td>
      )}

      <td>
        <div className="mb-0">
          {moment(item?.interviewDate).format('DD-MM-YYYY').toString()} -{' '}
          {moment(item?.interviewDate).format('HH:mm').toString()}
        </div>
      </td>
    </tr>
  );
