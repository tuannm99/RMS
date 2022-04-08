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
import { setJobId } from '../../redux/stores/job/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

function MenuPrivate(props) {
  const location = useLocation();
  const { userAccount, setJobId } = props;
  return (
    <Menu theme="dark" mode="inline" selectedKeys={location.pathname}>
      <Menu.Item key="/" icon={<DashboardFilled />}>
        <NavLink to="/">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="/recruit" icon={<FundViewOutlined />}>
        <NavLink to="/recruit">Recruit</NavLink>
      </Menu.Item>
      <Menu.Item
        key={`/cadidate`}
        icon={<CheckCircleFilled />}
        onClick={() => setJobId('')}
      >
        <NavLink to={`/cadidate`}>Candidate</NavLink>
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
const mapDispatchToProps = (dispatch) => ({
  setJobId: (payload) => dispatch(setJobId(payload)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MenuPrivate);
