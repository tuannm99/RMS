import React from 'react';
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
} from '@ant-design/icons';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import { imgURL } from '../../utils/utils';
import { logoutRequestService } from '../../services/authServices';
const { Header } = Layout;

function HeaderPrivate(props) {
  const { selectUserInfor } = props;

  const navigate = useNavigate();

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
      <Menu.Item key="1" icon={<ShoppingOutlined />}>
        Job posting
      </Menu.Item>
      {selectUserInfor?.role === 'admin' ? (
        <Menu.Item key="2" icon={<TeamOutlined />}>
          <NavLink to={`/employee/${true}/${null}`}>Employee</NavLink>
        </Menu.Item>
      ) : (
        <></>
      )}
      <Menu.Item key="3" icon={<ReadOutlined />}>
        Task
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
      <Menu.Item key="2" icon={<TeamOutlined />} onClick={handleLogout}>
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
    <Header className="site-layout-background" style={styles}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger fs-20 ml-16 mt-20',
          onClick: props.toggle,
        }
      )}
      <div className="header-right">
        <Button
          className="header-right-search-box mr-32"
          icon={<SearchOutlined />}
          size={32}
        >
          Search...
        </Button>
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
  );
}

const mapStateToProps = createStructuredSelector({
  selectUserInfor: selectUserInfor,
});

export default connect(mapStateToProps)(HeaderPrivate);
