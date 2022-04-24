import React, { useState } from 'react';
import { Layout, Button, Menu, Dropdown, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  DownOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingOutlined,
  ReadOutlined,
  KeyOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import { imgURL } from '../../utils/utils';
import { logoutRequestService } from '../../services/authServices';
import ModalAddNewCandidate from './ModalAddNewCandidate';
import { setVisibleAddJob } from '../../redux/stores/job/actions';
import { compose } from 'recompose';

const { Header } = Layout;

function HeaderPrivate(props) {
  const { selectUserInfor, setVisibleAddJob } = props;

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showAddJob = async () => {
    await navigate('/recruit');
    setVisibleAddJob(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /**
   * logout web
   */
  const handleLogout = () => {
    const token = localStorage.getItem('refreshToken');
    const params = {
      refreshToken: token,
    };
    logoutRequestService(params);
    localStorage.clear();
    navigate('/login');
  };

  /**
   * create menu add ...
   */
  const menuJob = (
    <Menu>
      {selectUserInfor?.role === 'hiringManager' && (
        <Menu.Item key="1" icon={<ShoppingOutlined />} onClick={showAddJob}>
          Job posting
        </Menu.Item>
      )}
      {selectUserInfor?.role === 'admin' ? (
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <NavLink to={`/employee/${true}/${null}`}>Employee</NavLink>
        </Menu.Item>
      ) : (
        <></>
      )}
      <Menu.Item key="3" icon={<ReadOutlined />} onClick={showModal}>
        Add candidate
      </Menu.Item>
    </Menu>
  );

  /**
   * create menu change page for user
   */
  const menuUser = (
    <Menu>
      <Menu.Item key="1" icon={<ShoppingOutlined />}>
        <NavLink to={`/profile/${selectUserInfor.id}`}>Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="3" icon={<KeyOutlined />}>
        <NavLink to={`changepass`}>Change password</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  /**
   * set padding for header
   */
  const styles = {
    padding: 0,
  };

  return (
    <>
      <Header className="site-layout-background" style={styles}>
        {React.createElement(
          props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger fs-20 ml-16 mt-20',
            onClick: props.toggle,
          }
        )}
        <div className="header-right">
          <Dropdown className="header-right-add-new mr-32" overlay={menuJob}>
            <Button>
              Add new <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown className="header-right-avatar mr-16" overlay={menuUser}>
            {selectUserInfor?.avatar?.path ? (
              <Avatar
                size={32}
                src={`${imgURL}${selectUserInfor?.avatar?.path}`}
              />
            ) : (
              <Avatar className="mr-16" size={32} icon={<UserOutlined />} />
            )}
          </Dropdown>
        </div>
      </Header>
      <ModalAddNewCandidate
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  selectUserInfor: selectUserInfor,
});

const mapDispatchToProps = (dispatch) => ({
  setVisibleAddJob: (payload) => dispatch(setVisibleAddJob(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HeaderPrivate);
