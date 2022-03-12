import React from 'react';
import { Menu } from 'antd';
import {
  DashboardFilled,
  ContactsFilled,
  FundViewOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

function MenuPrivate(props) {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="inline" selectedKeys={location.pathname}>
      <Menu.Item key="/" icon={<DashboardFilled />}>
        <NavLink to="/">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="/recruit" icon={<FundViewOutlined />}>
        <NavLink to="/recruit">Recruit</NavLink>
      </Menu.Item>
      <Menu.Item key="/conversation" icon={<ContactsFilled />}>
        <NavLink to="/conversation">Conversations</NavLink>
      </Menu.Item>
      <Menu.Item key="/taskRecruitment" icon={<CheckCircleFilled />}>
        <NavLink to="/taskRecruitment">Tasks</NavLink>
      </Menu.Item>
      <Menu.Item key="/employee" icon={<CheckCircleFilled />}>
        <NavLink to="/employee">Employee</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuPrivate;
