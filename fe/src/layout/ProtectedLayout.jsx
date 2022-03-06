import React, { useEffect, useState, useCallback } from 'react';
import { Layout, notification } from 'antd';
import { SiderBarPrivate, HeaderPrivate } from '../components';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { refreshTokenRequest } from '../redux/stores/auth/actions';
import { selectLoading, selectUserInfor } from '../redux/stores/auth/selectors';
import AuthRoutes from '../routers/AuthRoutes';

const { Content } = Layout;

function ProtectedLayout(props) {
  const navigate = useNavigate();
  const { refreshTokenRequest } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [timerToken, setTimerToken] = useState();
  const expires = localStorage.getItem('expires');
  const tokenLocal = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  let params = {
    refreshToken: refreshToken,
  };

  useEffect(() => {
    const intervalTime = setInterval(() => {
      const now = new Date();
      setTimerToken(now.getTime());
    }, 1000);
    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  useEffect(() => {
    refreshTokenFunction();
  }, [params]);

  useEffect(() => {
    if (!tokenLocal || !refreshToken) {
      navigate('/login');
    }
  }, [tokenLocal, refreshToken]);

  const refreshTokenFunction = async () => {
    if (
      timerToken + 20000 > moment.utc(expires).toDate().getTime() ||
      !expires
    ) {
      refreshTokenRequest(params);
    }
  };

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
            backgroundColor: 'rgb(240, 242, 245)',
          }}
        >
          <AuthRoutes />
        </Content>
      </Layout>
    </Layout>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: selectLoading,
  selectUser: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  refreshTokenRequest: (payload) => dispatch(refreshTokenRequest(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProtectedLayout);
