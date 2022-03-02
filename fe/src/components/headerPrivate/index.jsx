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
import { NavLink } from 'react-router-dom';
import './styles.css';

const { Header } = Layout;

function HeaderPrivate(props) {
  const handleMenuClick = (e) => {
    console.log('click', e);
  };
  const menuJob = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<ShoppingOutlined />}>
        Job posting
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        Employee
      </Menu.Item>
      <Menu.Item key="3" icon={<ReadOutlined />}>
        Task
      </Menu.Item>
    </Menu>
  );
  const menuUser = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<ShoppingOutlined />}>
        <NavLink to="/profile">Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
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
          <Avatar className="mr-16" size={32} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
}

export default HeaderPrivate;
