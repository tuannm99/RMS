import React, { useState, useEffect, useMemo } from 'react';
import './styles.css';
import {
  Card,
  Avatar,
  Col,
  Row,
  Select,
  Input,
  Pagination,
  Button,
  Spin,
  Popconfirm,
  Form,
  Radio,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { hasResponseError, base64String } from '../../utils/utils';
import { UserEdit_Add } from './components';
import * as services from '../../services/employeeServices';
import { toast } from 'react-toastify';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function EmployeePage(props) {
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [user, setUser] = useState();
  const [radio, setRadio] = useState(':asc');
  const [sortSlect, setSortSlect] = useState('all');
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [params, setParams] = useState({
    fullName: '',
    limit: 10,
    page: 1,
    sortBy: '',
  });

  const { userAccount } = props;
  const navigation = useNavigate();
  let { visible, userID } = useParams();

  const showUserEdit = (id) => {
    setVisibleEditUser(true);
    setUser(id);
  };

  const onCloseEditUser = () => {
    setVisibleEditUser(false);
    navigation(`/employee/false/${userID}`);
  };

  useEffect(() => {
    if (visible === 'true') {
      showUserEdit(userID);
    }
  }, []);

  useEffect(() => {
    getAlldata(params);
  }, [params]);

  const getAlldata = async (params) => {
    setLoading(true);
    const res = await services.getAllUsersServices(params);
    if (hasResponseError(res)) {
      return;
    }
    setUsers(res.data);
    setLoading(false);
  };

  const handleChangeData = (pagination) => {
    console.log(pagination);
    setParams({ ...params, page: pagination });
  };

  const onSearch = (value) => {
    setParams({ ...params, fullName: value });
  };

  const handleSelectRole = (value) => {
    console.log(value);
    if (value === 'all') {
      delete params.role;
    } else {
      setParams({ ...params, role: value });
    }
  };

  const handleSelectSort = (value) => {
    setSortSlect(value);
    if (value === 'all') {
      setParams({ ...params, sortBy: '' });
    } else {
      setParams({ ...params, sortBy: `${value}${radio}` });
    }
  };

  const onChangeRadio = (e) => {
    setRadio(e.target.value);
    console.log(`${sortSlect}${e.target.value}`);
    if (e.target.value === ':asc') {
      setParams({ ...params, sortBy: `` });
    } else {
      setParams({ ...params, sortBy: `${sortSlect}${e.target.value}` });
    }
  };

  const handleDetailUser = (id) => {
    if (userAccount?.role === 'admin') {
      navigation(`/profile/${id}`);
    } else {
      navigation(`/profile/${userAccount?.id}`);
    }
  };

  const handleDelete = async (id) => {
    const res = await services.deleteUsersServices(id);
    if (hasResponseError(res)) {
      return;
    }
    toast.success('Delete success!');
    getAlldata(params);
  };

  return (
    <>
      <Row className="employee_tool" wrap={true}>
        <Col flex={1} className="mt-12">
          <strong>Role: </strong>
          <Select
            defaultValue="all"
            style={{ width: 125 }}
            onSelect={handleSelectRole}
          >
            <Option value="all">All</Option>
            <Option value="admin">Admin</Option>
            <Option value="hiringManager">Hiring Manager</Option>
            <Option value="employee">Employee</Option>
          </Select>
        </Col>
        <Col flex={3} style={{ textAlign: 'center' }} className="mt-12">
          <Search
            style={{ maxWidth: 400, textAlign: 'center' }}
            placeholder="Employee Search"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col flex={1} className="fr mt-12">
          {users && (
            <Pagination
              pageSize={users?.limit}
              current={users?.page}
              total={users?.totalResults}
              onChange={handleChangeData}
              className="fr"
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col span={12} className="mt-12">
          <Button onClick={() => showUserEdit(null)}>Add Employee</Button>
        </Col>
        <Col span={11} className="mt-12">
          <div className="fr mr-8">
            <strong>Sort by: </strong>
            <Select
              defaultValue="all"
              style={{ width: 125 }}
              showArrow={true}
              onSelect={handleSelectSort}
            >
              <Option value="all">All</Option>
              <Option value="fullName">Name</Option>
              <Option value="createdAt">Create At</Option>
              <Option value="email">Email</Option>
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
        <Row gutter={20}>
          {loading && (
            <Col style={{ textAlign: 'center' }} span={24}>
              <Spin tip="loading..." />
            </Col>
          )}
          {users &&
            !loading &&
            users?.results?.map((item) => (
              <Col
                md={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 3 }}
                key={item.id}
                className="mb-24"
              >
                <div className="card">
                  <div
                    className="card-before"
                    onClick={() => handleDetailUser(item.id)}
                  ></div>
                  <Card
                    style={{ width: '100%', minHeight: '305px' }}
                    actions={
                      userAccount?.role === 'admin' &&
                      userAccount?.id !== item?.id
                        ? [
                            <EditOutlined
                              key="edit"
                              onClick={() => showUserEdit(item.id)}
                            />,
                            <Popconfirm
                              onConfirm={() => handleDelete(item.id)}
                              title="Are you sure？"
                              icon={<DeleteOutlined style={{ color: 'red' }} />}
                            >
                              <DeleteOutlined />
                            </Popconfirm>,
                          ]
                        : [
                            <EditOutlined
                              key="edit"
                              onClick={() => showUserEdit(item.id)}
                            />,
                          ]
                    }
                    hoverable="true"
                  >
                    <Meta
                      avatar={
                        !item.avatar ? (
                          <Avatar size={64} icon={<UserOutlined />} />
                        ) : (
                          <Avatar
                            size={64}
                            src={`data:image/png;base64,${base64String(
                              item?.avatar?.imageBuffer?.data
                            )}`}
                          />
                        )
                      }
                      title={item.fullName}
                      description={item.role}
                    />
                    <div className="content-card">
                      {item.email && (
                        <>
                          <p className="mb-0 mt-24">
                            <MailOutlined />
                          </p>
                          <div style={{ wordBreak: 'break-word' }}>
                            {item.email}
                          </div>
                        </>
                      )}
                      {item.phone && (
                        <>
                          <p className="mb-0">
                            <PhoneOutlined />
                          </p>
                          <span>{item.phone}</span>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </div>
      <UserEdit_Add
        visible={visibleEditUser}
        onclose={onCloseEditUser}
        user={user}
        getAlldata={getAlldata}
        params={params}
        form={form}
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(EmployeePage);
