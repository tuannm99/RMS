import React from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;
function HeaderPrivate(props) {
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger fs-20 ml-16 mt-20',
          onClick: props.toggle,
        }
      )}
    </Header>
  );
}

export default HeaderPrivate;
