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
  /**
   * create state
   */
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [user, setUser] = useState();
  const [radio, setRadio] = useState(':asc');
  const [sortSlect, setSortSlect] = useState('createdAt');
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    fullName: '',
    limit: 10,
    page: 1,
    sortBy: '',
  });

  const [form] = Form.useForm();
  const navigation = useNavigate();
  let { visible, userID } = useParams();

  const { userAccount } = props;

  useEffect(() => {
    if (visible === 'true' && userID !== 'null') {
      showUserEdit(userID);
    } else if (visible === 'true' && userID === 'null') {
      showUserEdit(null);
    } else {
      return;
    }
  }, [visible]);

  useEffect(() => {
    getAlldata(params);
  }, [params]);

  /**
   * display drawer form edit and add
   */
  const showUserEdit = async (id) => {
    await setUser(id);
    setVisibleEditUser(true);
  };

  /**
   * Close drawer
   */
  const onCloseEditUser = () => {
    setVisibleEditUser(false);
    if (userID !== 'null') {
      navigation(`/employee/false/${userID}`);
    } else {
      navigation(`/employee/false/${userAccount?.id}`);
    }
  };

  /**
   * get all list user
   * @param {*} params
   * @returns
   */
  const getAlldata = async (params) => {
    setLoading(true);
    const res = await services.getAllUsersServices(params);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    setUsers(res.data);
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
   * filter allow fullName
   * @param {*} value
   */
  const onSearch = (value) => {
    setParams({ ...params, fullName: value });
  };

  /**
   * change select role
   * @param {*} value
   */
  const handleSelectRole = (value) => {
    if (value === 'all') {
      delete params['role'];
      getAlldata(params);
    } else {
      setParams({ ...params, role: value });
    }
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

  /**
   * change page profile allow id
   * @param {*} id
   */
  const handleDetailUser = (id) => {
    if (userAccount?.role === 'admin') {
      navigation(`/profile/${id}`);
    } else {
      navigation(`/profile/${userAccount?.id}`);
    }
  };

  /**
   * remove employee allow id
   * @param {*} id
   * @returns
   */
  const handleDelete = async (id) => {
    const res = await services.deleteUsersServices(id);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    toast.success('Delete success!');
    getAlldata(params);
    const res1 = await services.getAllUsersServices();
    if (hasResponseError(res1)) {
      toast.error(`${res.data.message}`);
      return;
    }
    console.log(res1.data);
    if (res1.data.totalResults % params.limit === 0) {
      getAlldata({ ...params, page: params.page - 1 });
    } else {
      getAlldata(params);
    }
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
          {userAccount?.role === 'admin' && (
            <Button onClick={() => showUserEdit(null)}>Add Employee</Button>
          )}
        </Col>
        <Col span={11} className="mt-12">
          <div className="fr mr-8">
            <strong>Sort by: </strong>
            <Select
              defaultValue="createdAt"
              style={{ width: 125 }}
              showArrow={true}
              onSelect={handleSelectSort}
            >
              <Option value="createdAt">All</Option>
              <Option value="fullName">Name</Option>
              <Option value="updatedAt">Update By</Option>
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
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 3 }}
                key={item.id}
                className="mb-24"
              >
                <div className="card">
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
                        : (userAccount?.role === 'hiringManager' ||
                            userAccount?.role === 'employee') &&
                          userAccount?.id === item?.id
                        ? [
                            <EditOutlined
                              key="edit"
                              onClick={() => showUserEdit(item.id)}
                            />,
                          ]
                        : userAccount?.role === 'admin' &&
                          userAccount?.id === item?.id
                        ? [
                            <EditOutlined
                              key="edit"
                              onClick={() => showUserEdit(item.id)}
                            />,
                          ]
                        : ''
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
                      onClick={() => handleDetailUser(item.id)}
                    />
                    <div
                      className="content-card"
                      onClick={() => handleDetailUser(item.id)}
                    >
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
