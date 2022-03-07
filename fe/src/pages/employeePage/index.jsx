import React, { useState } from 'react';
import './styles.css';
import {
  Card,
  Avatar,
  Col,
  Row,
  Select,
  Input,
  Pagination,
  Tooltip,
  Table,
  Space,
  Tag,
  Divider,
  Drawer,
  Button,
} from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import DrawerFrom from './components/DrawerFrom';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;
function EmployeePage(props) {
  const [typeContent, setTypeContent] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [drawer1, setDrawer1] = useState(false);

  const showDrawer1 = () => {
    setDrawer1(true);
  };

  const onClose1 = () => {
    setDrawer1(false);
  };
  const showDrawer = () => {
    setDrawer(true);
  };

  const onClose = () => {
    setDrawer(false);
  };
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const handleTypeContent = () => {
    setTypeContent(!typeContent);
  };
  return (
    <>
      <Row className="employee_tool">
        <Col span={4}>
          <strong>Role:</strong>
          <Select defaultValue="lucy" bordered={false}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={4}>
          <strong>Sort by:</strong>
          <Select defaultValue="lucy" bordered={false}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Search placeholder="Employee Search" enterButton />
        </Col>
        <Col span={7} className="fr">
          {typeContent ? (
            <Pagination
              simple
              defaultCurrent={2}
              total={50}
              className="fr mt-4"
            />
          ) : (
            ''
          )}
        </Col>
        <Col span={1}>
          <Tooltip
            placement="bottomRight"
            title={typeContent ? 'List view' : 'Title view'}
            className="mt-4 fr"
          >
            <div onClick={handleTypeContent}>
              {typeContent ? (
                <MenuFoldOutlined className="fs-24" />
              ) : (
                <AlignRightOutlined className="fs-24" />
              )}
            </div>
          </Tooltip>
        </Col>
      </Row>
      <div className="btn_add_employee">
        <Button className="mt-12" onClick={showDrawer1}>
          Add Employee
        </Button>
      </div>
      {typeContent ? (
        <div className="employee_content">
          <Card
            style={{ width: 270, margin: 10 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
            hoverable="true"
            onClick={showDrawer}
          >
            <Meta
              avatar={<Avatar size={64} icon={<UserOutlined />} />}
              title="Ngo Van"
              description="Business"
            />
            <p className="mb-0 mt-24">
              <MailOutlined />
            </p>
            <span>lbrennan@freshteam.com</span>
            <p className="mb-0">
              <PhoneOutlined />
            </p>
            <span>0795148134</span>
          </Card>
        </div>
      ) : (
        <Table columns={columns} dataSource={data} className="mt-16" />
      )}
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawer}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
      <DrawerFrom
        showDrawer1={showDrawer1}
        onClose1={onClose1}
        drawer1={drawer1}
      />
    </>
  );
}

export default EmployeePage;
