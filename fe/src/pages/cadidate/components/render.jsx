import {
  Divider,
  Col,
  Row,
  Form,
  Select,
  Input,
  DatePicker,
  Menu,
  Popconfirm,
  Dropdown,
  Rate,
  Tag,
} from 'antd';
import { MinusCircleFilled, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { MoreOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
const { Option } = Select;
const { RangePicker } = DatePicker;

const desc = ['contact', 'test', 'technical', 'cultureFit'];

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
    padding: '15px 10px',
  },
};

export const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="84">+84</Option>
    </Select>
  </Form.Item>
);

export const renderEmployee = ({ setDisableEmp }) => {
  return (
    <>
      <Divider orientation="left">Employee</Divider>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              { required: true, message: 'Please enter Designation!' },
              {
                pattern: new RegExp(/[a-zA-X]/),
                message: 'Please enter Designation!',
              },
            ]}
          >
            <Input placeholder="Enter designation" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="bussinessName"
            label="Company/ Business Name"
            rules={[
              {
                required: true,
                message: 'Please enter Company/ Business Name!',
              },
              {
                pattern: new RegExp(/[a-zA-X]/),
                message: 'Please enter Company/ Business Name!',
              },
            ]}
          >
            <Input placeholder="Enter Company/ Business Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fromto"
            label="From - To"
            rules={[{ required: true, message: 'Please enter From - To!' }]}
          >
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="summary" label="Summary">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className="cu" onClick={() => setDisableEmp(false)}>
            <MinusCircleFilled style={{ color: 'red' }} /> Remove Employee
          </div>
        </Col>
      </Row>
    </>
  );
};

export const renderEducation = ({ setDisableEdu }) => (
  <>
    <Divider orientation="left">Education</Divider>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="degree"
          label="Degree"
          rules={[
            { required: true, message: 'Please enter Degree!' },
            {
              pattern: new RegExp(/[a-zA-X]/),
              message: 'Please enter Degree!',
            },
          ]}
        >
          <Input placeholder="Enter designation" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="universityName"
          label="Institution/ School Name"
          rules={[
            {
              required: true,
              message: 'Please enterInstitution/ School Name!',
            },
            {
              pattern: new RegExp(/[a-zA-X]/),
              message: 'Please enter enterInstitution/ School Name!',
            },
          ]}
        >
          <Input placeholder="Enter Institution/ School Name" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="fieldOfStudy" label="Field of study/ Major">
          <Input placeholder="Enter Field of study/ Major" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="grade" label="Grade">
          <Input placeholder="Enter Grade" />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item
          name="fromend"
          label="From - To"
          rules={[{ required: true, message: 'Please enter From - To!' }]}
        >
          <RangePicker />
        </Form.Item>
      </Col>
      <Col span={24}>
        <div className="cu" onClick={() => setDisableEdu(false)}>
          <MinusCircleFilled style={{ color: 'red' }} /> Remove Education
        </div>
      </Col>
    </Row>
  </>
);

export const renderHeadTable = (item, index) => (
  <th style={styles.th} key={index}>
    {item}
  </th>
);

export const customerTableHead = [
  'Name',
  'Apply for',
  'Contact',
  'Status',
  'Stages',
  'Applied Date',
  'More',
];

const menuMoreTable = (id, handleDelete, setVisible) => (
  <Menu>
    <Menu.Item key="Interview">
      <p className="mb-0" onClick={() => setVisible(true)}>
        Schedule Interview
      </p>
    </Menu.Item>
    <Menu.Item key="delete">
      <Popconfirm
        onConfirm={() => handleDelete(id)}
        title="Are you sure？"
        icon={<DeleteOutlined style={{ color: 'red' }} />}
      >
        <p className="mb-0">Delete</p>
      </Popconfirm>
    </Menu.Item>
  </Menu>
);

export const renderBodyTable = (
  item,
  index,
  handleDelete,
  setVisibleInfoCadi,
  setCadidateId,
  setVisible,
  userAccount,
  navigate
) => (
  <tr key={item.id} style={styles.tr}>
    <td
      style={{ ...styles.td, color: '#2c5cc5', cursor: 'pointer' }}
      onClick={() => {
        setVisibleInfoCadi(true);
        setCadidateId(item.id);
      }}
    >
      {item.firstName} {item.midName} {item.lastName}
    </td>
    <td
      className="pl-8 cu"
      onClick={() => {
        navigate(`/recruit/${item.jobId.id}`);
      }}
    >
      {item?.jobId?.title}
    </td>
    <td style={styles.td}>
      <div className="mb-0">
        <PhoneOutlined /> {item.phone}
      </div>
      <div className="mb-0">
        <MailOutlined /> {item.email}
      </div>
    </td>
    <td style={styles.td}>
      {item?.status === 'open' ? (
        <Tag color="green">{item?.status}</Tag>
      ) : item?.status === 'reject' ? (
        <Tag color="red">{item?.status}</Tag>
      ) : (
        <Tag color="geekblue">{item?.status}</Tag>
      )}
    </td>
    <td style={styles.td}>
      <div className="mb-0">
        <Rate
          count={4}
          tooltips={desc}
          disabled="true"
          value={1 + desc.findIndex((e) => e === item.stage)}
        />
      </div>
    </td>
    <td style={{ ...styles.td, fontWeight: '400' }}>
      {moment.utc(item.updatedAt).format('YYYY-MM-DD').toString()}
    </td>
    {userAccount?.role === 'hiringManager' && (
      <td style={styles.td}>
        <Dropdown
          overlay={menuMoreTable(item.id, handleDelete, setVisible)}
          placement="bottomRight"
          arrow
        >
          <MoreOutlined className="fr fs-24 cu" />
        </Dropdown>
      </td>
    )}
  </tr>
);
