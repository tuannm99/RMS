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
const { Option, OptGroup } = Select;

function EmployeePage(props) {
  const [typeContent, setTypeContent] = useState(true);
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    fullName: '',
    limit: 10,
    page: 1,
    sortBy: '',
  });

  const { userAccount } = props;
  const navigation = useNavigate();
  let {visible} = useParams()

  const showUserEdit = (id) => {
    setVisibleEditUser(true);
    setUser(id);
  };

  const onCloseEditUser = () => {
    setVisibleEditUser(false);
  };

  const editUser = (id) => {};

  const handleTypeContent = () => {
    setTypeContent(!typeContent);
  };

useEffect(()=>{
  if(visible === "true"){
    showUserEdit(userAccount?.id)
  }
},[])

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
    getAlldata({ ...params, page: pagination });
  };

  const onSearch = (value) => {
    setParams({ ...params, fullName: value });
    getAlldata({ ...params, fullName: value });
  };

  const handleSelectRole = (value) => {
    console.log(value);
    if (value === 'all') {
      delete params.role;
      getAlldata(params);
    } else {
      setParams({ ...params, role: value });
      getAlldata({ ...params, role: value });
    }
  };

  const handleSelectSort = (value) => {
    if (value === 'all') {
      setParams({ ...params, sortBy: '' });
      getAlldata(params);
    } else {
      setParams({ ...params, sortBy: value });
      getAlldata({ ...params, role: value });
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
    await services.deleteUsersServices(id).then((res) => {
      if (hasResponseError(res)) {
        return;
      }
    toast.success('Delete success!');
    });
    getAlldata(params);
  };

  return (
    <>
      <Row className="employee_tool" wrap={true}>
        <Col flex={1}>
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
        <Col flex={1}>
          <strong>Sort by: </strong>
          <Select
            defaultValue="all"
            style={{ width: 125 }}
            showArrow={false}
            onSelect={handleSelectSort}
          >
            <Option value="all">All</Option>
            <Option value="fullName:asc">Name</Option>
            <Option value="createdAt:asc">Create At</Option>
            <Option value="Yiminghe:asc">Role</Option>
            <Option value="email:asc">Email</Option>
          </Select>
        </Col>
        <Col flex={2}>
          <Search
            style={{ maxWidth: 400, textAlign: 'center' }}
            placeholder="Employee Search"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col flex={1} className="fr">
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
      <div className="btn_add_employee">
        <Button className="mt-12" onClick={() => showUserEdit(null)}>
          Add Employee
        </Button>
      </div>
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
                <Card
                  style={{ width: '100%', minHeight: '305px' }}
                  actions={
                    userAccount?.role === 'admin' &&
                    userAccount?.id !== item?.id && [
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
                  <div
                    className="content-card"
                    onClick={() => handleDetailUser(item.id)}
                  >
                    <p className="mb-0 mt-24" >
                      <MailOutlined />
                    </p>
                    <div style={{wordBreak:"break-word"}}>{item.email}</div>
                    <p className="mb-0">
                      <PhoneOutlined />
                    </p>
                    <span>{item.phone}</span>
                  </div>
                </Card>
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
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(EmployeePage);
