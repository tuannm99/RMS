import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Select,
  Pagination,
  Radio,
  Button,
  Input,
  Spin,
  Rate,
  Tag,
  Dropdown,
  Menu,
  Popconfirm,
} from 'antd';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as services from '../../services/cadidateServices';
import * as jobServices from '../../services/jobService';
import { Table } from '../../components';
import { hasResponseError } from '../../utils/utils';
import { toast } from 'react-toastify';
import {
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Add_Cadidate } from './components';

const { Option } = Select;
const { Search } = Input;
const desc = ['contact', 'test', 'technical', 'cultureFit', '...'];

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

const customerTableHead = [
  'Name',
  'Contact',
  'Status',
  'Stages',
  'Applied Date',
  'More',
];

function CadidatePage(props) {
  const [radio, setRadio] = useState(':asc');
  const [sortSlect, setSortSlect] = useState('createdAt');
  const [cadidate, setCadidate] = useState();
  const [jobs, setJobs] = useState();
  const [visibleAddCadi, setVisibleAddCadi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    sortBy: '',
  });

  const { userAccount } = props;

  useEffect(() => {
    getAlldataJob();
  }, []);

  useEffect(() => {
    getAlldataCadidate(params);
  }, [params]);

  const showAddCadidate = () => {
    setVisibleAddCadi(true);
  };

  const onCloseAddCadi = () => {
    setVisibleAddCadi(false);
  };

  /**
   * get all list cadidate
   * @param {*} params
   * @returns
   */
  const getAlldataCadidate = async (params) => {
    setLoading(true);
    const res = await services.getAllCadidatesServices(params);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    setCadidate(res.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const res = await services.deleteCadidateServices(id);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    toast.success('Delete success!');
    const res1 = await services.getAllCadidatesServices();
    if (hasResponseError(res1)) {
      toast.error(`${res.data.message}`);
      return;
    }
    if (res1.data.totalResults % params.limit === 0) {
      getAlldataCadidate({ ...params, page: params.page - 1 });
    } else {
      getAlldataCadidate(params);
    }
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>
        <Popconfirm
          onConfirm={() => handleDelete(id)}
          title="Are you sure？"
          icon={<DeleteOutlined style={{ color: 'red' }} />}
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  /**
   * get all list job
   * @param {*} params
   * @returns
   */
  const getAlldataJob = async (params) => {
    setLoading(true);
    const res = await jobServices.getAllJobs(params);
    if (hasResponseError(res)) {
      return;
    }
    setJobs(res.data.results);
    setLoading(false);
  };
  /**
   * change page size
   * @param {*} pagination
   */
  const handleChangeData = (pagination) => {
    setParams({ ...params, page: pagination });
  };

  /**
   * change select sort
   * @param {*} value
   */
  const handleSelectSort = (value) => {
    setSortSlect(value);
    setParams({ ...params, sortBy: `${value}${radio}` });
  };

  /**
   * change radio sort allow asc and desc
   * @param {*} e
   */
  const onChangeRadio = (e) => {
    setRadio(e.target.value);
    setParams({ ...params, sortBy: `${sortSlect}${e.target.value}` });
  };

  const renderHead = (item, index) => (
    <th style={styles.th} key={index}>
      {item}
    </th>
  );

  const renderBody = (item, index) => (
    <tr key={item.id} style={styles.tr}>
      <td style={{ ...styles.td, color: '#2c5cc5' }}>
        {item.firstName} {item.midName} {item.lastName}
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
        <Tag color="geekblue">{item.status}</Tag>
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
      <td style={styles.td}>
        {(userAccount.role === 'admin' ||
          userAccount.role === 'hiringManager') && (
          <Dropdown overlay={menu(item.id)} placement="bottomRight" arrow>
            <MoreOutlined className="fr fs-24 cu" />
          </Dropdown>
        )}
      </td>
    </tr>
  );

  return (
    <>
      <Row className="employee_tool" wrap={true}>
        <Col flex={1} className="mt-12">
          {/* <strong>Role: </strong>
          <Select
            defaultValue="createdAt"
            style={{ width: 125 }}
            // onSelect={handleSelectSort}
          >
            <Option value="createdAt">All</Option>
            <Option value="admin">Admin</Option>
            <Option value="hiringManager">Hiring Manager</Option>
            <Option value="employee">Employee</Option>
          </Select> */}
        </Col>
        <Col flex={3} style={{ textAlign: 'center' }} className="mt-12">
          <Search
            style={{ maxWidth: 400, textAlign: 'center' }}
            placeholder="Cadidate Name Search"
            // onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col flex={1} className="fr mt-12">
          {cadidate && (
            <Pagination
              pageSize={cadidate?.limit}
              current={cadidate?.page}
              total={cadidate?.totalResults}
              onChange={handleChangeData}
              className="fr"
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col span={12} className="mt-12">
          {(userAccount?.role === 'admin' ||
            userAccount?.role === 'hiringManager') && (
            <Button onClick={showAddCadidate}>Add Cadidate</Button>
          )}
        </Col>
        <Col span={11} className="mt-12">
          <div className="fr mr-8">
            <strong>Sort by: </strong>
            <Select
              defaultValue="createdAt"
              style={{ width: 125 }}
              onSelect={handleSelectSort}
              showArrow={true}
            >
              <Option value="createdAt">All</Option>
              <Option value="fullName">Name</Option>
              <Option value="updatedAt">Update At</Option>
              <Option value="email">Email</Option>
              <Option value="stage">Stage</Option>
            </Select>
          </div>
        </Col>
        <Col span={1} className="radio-sort">
          <Radio.Group onChange={onChangeRadio} value={radio}>
            <Radio value=":asc">Asc</Radio>
            <br />
            <Radio value=":desc">Desc</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <div className="employee_content mt-16">
        {loading ? (
          <Col style={{ textAlign: 'center' }} span={24}>
            <Spin tip="loading..." />
          </Col>
        ) : (
          <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={cadidate?.results}
            renderBody={(item, index) => renderBody(item, index)}
          />
        )}
      </div>

      <Add_Cadidate
        visible={visibleAddCadi}
        onclose={onCloseAddCadi}
        getAllData={getAlldataCadidate}
        params={params}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(CadidatePage);
