import React, { useState } from 'react';
import { Layout } from 'antd';
import SiderBarPrivate from '../siderBarPrivate';
import HeaderPrivate from '../headerPrivate';
import FooterPrivate from '../footerPrivate';
import RouterLayout from '../routerLayout/PrivateRouter';
const { Content } = Layout;
function LayoutPrivate(props) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <SiderBarPrivate collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderPrivate collapsed={collapsed} toggle={toggle} />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <RouterLayout />
        </Content>
        <FooterPrivate />
      </Layout>
    </Layout>
  );
}

export default LayoutPrivate;
