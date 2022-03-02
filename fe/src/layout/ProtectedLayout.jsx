import React, { useEffect, useState, useCallback } from 'react';
import { Layout } from 'antd';
import { SiderBarPrivate, HeaderPrivate } from '../components';
import moment from 'moment';

import AuthRoutes from '../routers/AuthRoutes';

const { Content } = Layout;

// function formatDate(date) {
//   if (!date) return '';
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDay();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   return ${year}${month}${day}${hours}${minutes}${seconds};
// }

function ProtectedLayout(props) {
  // let tokens = JSON.parse(localStorage.getItem('tokens'));
  const [collapsed, setCollapsed] = useState(false);
  const [timerToken, setTimerToken] = useState();
  //const [token, setTokens] = useState(tokens.access.token);

  // const b = moment.utc(tokens.access.expires).toDate();
  // console.log(formatDate(b));
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  // console.log(b);
  // const now = new Date();
  // console.log(now);

  // useEffect(() => {
  //   const intervalTime = setInterval(() => {
  //     const now = new Date();
  //     setTimerToken(now.getTime());
  //   }, 1000);
  //   if (timerToken > b.getTime()) {
  //     console.log(b);
  //     console.log(timerToken);
  //   } else {
  //     console.log(b);
  //   }
  //   return () => {
  //     clearInterval(intervalTime);
  //   };
  // }, [token]);

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
            backgroundColor: 'rgb(240, 242, 245)',
          }}
        >
          <AuthRoutes />
          {/* {timerToken} */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProtectedLayout;
