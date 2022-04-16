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

export const renderBodyTable = (item, index) => (
  <tr key={item.id} style={styles.tr}>
    <td style={styles.td}>{item.scheduleBy.fullName}</td>
    <td style={styles.td}>{item.interviewer.fullName}</td>
    <td>
      <div className="mb-0">
        {moment(item?.interviewDate).format('DD-MM-YYYY').toString()} -{' '}
        {moment(item?.interviewDate).format('HH:mm').toString()}
        {moment(item?.interviewDate).format('DD-MM-YYYY').toString() ===
        moment(current).format('DD-MM-YYYY').toString()
          ? ' (today)'
          : ''}
      </div>
    </td>
  </tr>
);
