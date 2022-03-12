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
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { hasResponseError } from '../../utils/utils';
import { UserEdit_Add } from './components';
import * as services from '../../services/employeeServices';
import { toast } from 'react-toastify';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

function EmployeePage(props) {
  const [typeContent, setTypeContent] = useState(true);
  const [visibleEditUser, setVisibleEditUser] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();

  const { userAccount } = props;
  console.log(userAccount);
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

  const base64String = (previewImg) => {
    return window.btoa(String.fromCharCode(...new Uint8Array(previewImg)));
  };

  useEffect(() => {
    services.getAllUsersServices().then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`);
        return;
      }
      setUsers(res.data);
      console.log(res);
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
        <Col span={8} className="fr">
          <Pagination
            simple
            defaultCurrent={2}
            total={50}
            className="fr mt-4"
          />
        </Col>
      </Row>
      <div className="btn_add_employee">
        <Button className="mt-12" onClick={() => showUserEdit(null)}>
          Add Employee
        </Button>
      </div>
      <div className="employee_content mt-16">
        <Row gutter={16}>
          {users &&
            users?.results.map((item) => (
              <Col
                md={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 4 }}
                key={item.id}
              >
                <Card
                  style={{ width: '100%' }}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => showUserEdit(item.id)}
                    />,
                    <DeleteOutlined key="delete" />,
                  ]}
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
              </Col>
            ))}
        </Row>
      </div>
      <UserEdit_Add
        visible={visibleEditUser}
        onclose={onCloseEditUser}
        user={user}
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(EmployeePage);
