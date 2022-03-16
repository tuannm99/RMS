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
  DeleteOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import { hasResponseError } from '../../utils/utils';
import { UserDetail, generateColumns, UserEdit_Add } from './components';
import * as services from '../../services/employeeServices';
import { toast } from 'react-toastify';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function EmployeePage(props) {
  const [typeContent, setTypeContent] = useState(true);
  const [visibleUser, setVisibleUser] = useState(false);
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();

  const showUserDetail = (id) => {
    setVisibleUser(true);
    services.getDetailUsersServices(id).then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`, {
          autoClose: 3000,
        });
        return;
      }
      setUser(res.data);
    });
  };

  const onCloseUser = () => {
    setVisibleUser(false);
  };

  const showUserEdit = (id) => {
    setVisibleEditUser(true);
  };

  const onCloseEditUser = () => {
    setVisibleEditUser(false);
  };

  const handleDelete = async (id) => {};

  const editUser = (id) => {};

  const handleTypeContent = () => {
    setTypeContent(!typeContent);
  };

  const userColumns = useMemo(
    () =>
      generateColumns({
        delteSt: handleDelete,
        edit: editUser,
      }),
    [handleDelete, editUser]
  );

  useEffect(() => {
    services.getAllUsersServices().then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setUsers(res.data.results);
    });
  }, []);

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
        <Button className="mt-12" onClick={() => showUserEdit(null)}>
          Add Employee
        </Button>
      </div>
      {typeContent ? (
        <div className="employee_content">
          {users &&
            users.map((item) => (
              <Card
                style={{ width: 270, margin: 10 }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => showUserEdit(item.id)}
                  />,
                  <DeleteOutlined key="delete" />,
                ]}
                hoverable="true"
                key={item.id}
              >
                <div onClick={() => showUserDetail(item.id)}>
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
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <Table columns={userColumns} dataSource={users} className="mt-16" />
      )}
      <UserDetail visible={visibleUser} onclose={onCloseUser} user={user} />
      <UserEdit_Add
        visible={visibleEditUser}
        onclose={onCloseEditUser}
        user={user}
      />
    </>
  );
}

export default EmployeePage;
