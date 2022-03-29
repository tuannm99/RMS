import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { SiderBarPrivate, HeaderPrivate } from '../components';
import { useNavigate } from 'react-router-dom';
import AuthRoutes from '../routers/AuthRoutes';

const { Content } = Layout;

function ProtectedLayout(props) {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const tokenLocal = localStorage.getItem('token');

  /**
   * change page login aloww token and refresh
   */
  useEffect(() => {
    if (!tokenLocal) {
      navigate('/login');
      localStorage.clear();
    }
  }, [tokenLocal]);

  /**
   * toggle display sibar
   */
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
            margin: '0 16px',
            padding: '8px 24px',
            minHeight: 280,
            backgroundColor: 'rgb(240, 242, 245)',
          }}
        >
          <AuthRoutes />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProtectedLayout;
