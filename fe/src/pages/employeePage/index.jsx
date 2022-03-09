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
  Tooltip,
  Table,
  Space,
  Tag,
  Divider,
  Drawer,
  Button,
  Spin,
} from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getAllUserRequest } from '../../redux/stores/employee/actions';
import {
  selectDataUser,
  selectLoading,
} from '../../redux/stores/employee/selectors';
import { UserDetail, generateColumns } from './components';
import { getDetailUsersServices } from '../../services/employeeServices';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function EmployeePage(props) {
  const [typeContent, setTypeContent] = useState(true);
  const [visibleUser, setVisibleUser] = useState(false);
  const [user, setUser] = useState({});
  const { isLoading, dataUser } = props;
  const { getAllUserRequest } = props;

  const showUserDetail = (id) => {
    setVisibleUser(true);
    getDetailUsersServices(id).then((res) => setUser(res.data));
  };

  const onCloseUser = () => {
    console.log(visibleUser);
    setVisibleUser(false);
  };

  const handleDelete = async (id) => {};

  const editUser = (id) => {};

  const userColumns = useMemo(
    () =>
      generateColumns({
        delteSt: handleDelete,
        edit: editUser,
      }),
    [handleDelete, editUser]
  );

  useEffect(() => {
    getAllUserRequest();
  }, []);

  const handleTypeContent = () => {
    setTypeContent(!typeContent);
  };

  const handleEdit = () => {
    console.log('hello');
  };

  return (
    <>
      <Row className="employee_tool">
        <Col span={4}>
          <strong>Role:</strong>
          <Select defaultValue="lucy" bordered={false}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={4}>
          <strong>Sort by:</strong>
          <Select defaultValue="lucy" bordered={false}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Search
            style={{ maxWidth: 400, textAlign: 'center' }}
            placeholder="Employee Search"
            enterButton
          />
        </Col>
        <Col span={7} className="fr">
          {typeContent ? (
            <Pagination
              simple
              defaultCurrent={2}
              total={50}
              className="fr mt-4"
            />
          ) : (
            ''
          )}
        </Col>
        <Col span={1}>
          <Tooltip
            placement="bottomRight"
            title={typeContent ? 'List view' : 'Title view'}
            className="mt-4 fr"
          >
            <div onClick={handleTypeContent}>
              {typeContent ? (
                <MenuFoldOutlined className="fs-24" />
              ) : (
                <AlignRightOutlined className="fs-24" />
              )}
            </div>
          </Tooltip>
        </Col>
      </Row>
      <div className="btn_add_employee">
        <Button className="mt-12">Add Employee</Button>
      </div>
      {typeContent ? (
        <div className="employee_content">
          {dataUser.map((item) => (
            <Card
              style={{ width: 270, margin: 10 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={handleEdit} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
              hoverable="true"
              onClick={() => showUserDetail(item.id)}
              key={item.username}
            >
              <Meta
                avatar={
                  !item.avatar ? (
                    <Avatar size={64} icon={<UserOutlined />} />
                  ) : (
                    <Avatar size={64} src={item.avatar} />
                  )
                }
                title={
                  item.firstName && item.lastName
                    ? `${item.firstName} ${item.lastName}`
                    : item.username
                }
                description={item.role}
              />
              <p className="mb-0 mt-24">
                <MailOutlined />
              </p>
              <span>{item.email}</span>
              <p className="mb-0">
                <PhoneOutlined />
              </p>
              <span>0795148134</span>
            </Card>
          ))}
        </div>
      ) : (
        <Table columns={userColumns} dataSource={dataUser} className="mt-16" />
      )}
      <UserDetail visible={visibleUser} onclose={onCloseUser} user={user} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  dataUser: selectDataUser,
});
const mapDispatchToProps = (dispatch) => ({
  getAllUserRequest: (payload) => dispatch(getAllUserRequest(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EmployeePage);
