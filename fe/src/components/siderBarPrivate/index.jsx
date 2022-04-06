import React from 'react';
import { Layout } from 'antd';
import logo from '../../assets/image/logo/aaaaaaaaa.PNG';
import MenuPrivate from '../menuPrivate';
import { NavLink } from 'react-router-dom';
import './styles.css';

const { Sider } = Layout;

function SiderBarPrivate(props) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ minHeight: '100vh' }}
    >
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="" />
          {!props.collapsed && <p className="fs-20 siderbar-logo">RMS</p>}
        </NavLink>
      </div>
      <MenuPrivate />
    </Sider>
  );
}

export default SiderBarPrivate;
