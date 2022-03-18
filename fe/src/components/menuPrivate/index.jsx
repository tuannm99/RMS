import React from 'react';
import { Menu } from 'antd';
import {
  DashboardFilled,
  ContactsFilled,
  FundViewOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

function MenuPrivate(props) {
  const location = useLocation();
  const { userAccount } = props;
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
      <Menu.Item key="/cadidate" icon={<CheckCircleFilled />}>
        <NavLink to="/cadidate">Cadidate</NavLink>
      </Menu.Item>
      <Menu.Item
        key={`/employee/false/${userAccount?.id}`}
        icon={<CheckCircleFilled />}
      >
        <NavLink to={`/employee/false/${userAccount?.id}`}>Employee</NavLink>
      </Menu.Item>
    </Menu>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
export default connect(mapStateToProps)(MenuPrivate);
