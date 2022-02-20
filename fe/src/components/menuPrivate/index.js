import React from "react";
import { Menu } from "antd";
import {
  DashboardFilled,
  WalletFilled,
  ContactsFilled,
  FundViewOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { NavLink, useMatch } from "react-router-dom";

const { SubMenu } = Menu;
function MenuPrivate(props) {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={useMatch("/") && "1"}>
      <Menu.Item key="1" icon={<DashboardFilled />}>
        <NavLink to="/">Dashboard</NavLink>
      </Menu.Item>
      <SubMenu key="sub1" icon={<WalletFilled />} title="Recruitment">
        <Menu.Item key="2" icon={<FundViewOutlined />}>
          <NavLink to="/recruit">Recruit</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContactsFilled />}>
          <NavLink to="/conversation">Conversations</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<CheckCircleFilled />}>
          <NavLink to="/taskRecruitment">Tasks</NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default MenuPrivate;
