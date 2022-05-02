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
      <Divider orientation="left">Employer</Divider>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              { required: true, message: 'please enter designation' },
              {
                pattern: new RegExp(/^[^\s].*/),
                message: 'The start character cannot be a space.',
              },
            ]}
          >
            <Input allowClear={true} placeholder="Enter designation" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="bussinessName"
            label="Company/ Business Name"
            rules={[
              {
                required: true,
                message: 'please enter Company/ Business Name',
              },
              {
                pattern: new RegExp(/^[^\s].*/),
                message: 'The start character cannot be a space.',
              },
            ]}
          >
            <Input
              allowClear={true}
              placeholder="Enter Company/ Business Name"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="fromto"
            label="From - To"
            rules={[{ required: true, message: 'please enter date' }]}
          >
            <RangePicker />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="summary" label="Summary">
            <Input.TextArea allowClear={true} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className="cu" onClick={() => setDisableEmp(false)}>
            <MinusCircleFilled style={{ color: 'red' }} /> Remove Employer
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
            { required: true, message: 'please enter Degree' },
            {
              pattern: new RegExp(/^[^\s].*/),
              message: 'The start character cannot be a space.',
            },
          ]}
        >
          <Input allowClear={true} placeholder="Enter designation" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="universityName"
          label="Institution/ School Name"
          rules={[
            {
              required: true,
              message: 'please enter Institution/ School Name',
            },
            {
              pattern: new RegExp(/^[^\s].*/),
              message: 'The start character cannot be a space.',
            },
          ]}
        >
          <Input
            allowClear={true}
            placeholder="Enter Institution/ School Name"
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="fieldOfStudy"
          label="Field of study/ Major"
          rules={[
            { required: true, message: 'please enter Field of study/ Major' },

            {
              pattern: new RegExp(/^[^\s].*/),
              message: 'The start character cannot be a space.',
            },
          ]}
        >
          <Input allowClear={true} placeholder="Enter Field of study/ Major" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="grade"
          label="Grade"
          rules={[
            { required: true, message: 'please enter Grade' },
            {
              pattern: new RegExp(/^[^\s].*/),
              message: 'The start character cannot be a space.',
            },
          ]}
        >
          <Input allowClear={true} placeholder="Enter Grade" />
        </Form.Item>
      </Col>
      <Col span={16}>
        <Form.Item
          name="fromend"
          label="From - To"
          rules={[{ required: true, message: 'please enter date' }]}
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

const menuMoreTable = (
  id,
  handleDelete,
  setVisible,
  setInterviewerId,
  setCadidateId,
  userAccount
) => (
  <>
    {userAccount?.role === 'hiringManager' && (
      <Menu>
        <Menu.Item key="Interview">
          <p
            className="mb-0"
            onClick={() => {
              setVisible(true);
              setInterviewerId(null);
              setCadidateId(id);
            }}
          >
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
    )}
  </>
);

export const renderBodyTable = (
  item,
  index,
  handleDelete,
  setVisibleInfoCadi,
  setCadidateId,
  setVisible,
  userAccount,
  navigate,
  setInterviewerId
) => (
  <tr key={item.id} style={styles.tr}>
    <td
      style={{ ...styles.td, color: '#2c5cc5', cursor: 'pointer' }}
      onClick={() => {
        setVisibleInfoCadi(true);
        setCadidateId(item.id);
      }}
    >
      {item.lastName} {item.midName} {item.firstName}
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
      {moment.utc(item.createdAt).format('YYYY-MM-DD').toString()}
    </td>
    <td style={styles.td}>
      <Dropdown
        overlay={menuMoreTable(
          item.id,
          handleDelete,
          setVisible,
          setInterviewerId,
          setCadidateId,
          userAccount
        )}
        placement="bottomRight"
        arrow
      >
        <MoreOutlined className="fr fs-24 cu" />
      </Dropdown>
    </td>
  </tr>
);
