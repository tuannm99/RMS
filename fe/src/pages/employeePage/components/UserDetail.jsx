import React from 'react';
import { Avatar, Divider, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DrawerComponent } from '../../../components';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper mb-8">
    <p className="site-description-item-profile-p-label mb-0">{title}:</p>
    {content}
  </div>
);

function UserDetail({ onclose, visible, user }) {
  return (
    <DrawerComponent
      title="Information employee"
      onClose={onclose}
      visible={visible}
    >
      <p
        className="site-description-item-profile-p"
        style={{
          marginBottom: 24,
          height: 100,
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        User Profile
        {user.avatar ? (
          <img
            className="fr"
            src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.6435-1/188965514_2984594158530562_1490125355702165300_n.jpg?stp=c53.0.160.160a_dst-jpg_p160x160&_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_ohc=-cjNedcZq14AX-LzSri&_nc_ht=scontent-sin6-3.xx&oh=00_AT_JmiBdSrVqCQ8Zp2yt7Ouu50cxR3r7BaIhCNsELoUHCw&oe=624FDBE3"
          />
        ) : (
          <Avatar
            className="fr"
            shape="square"
            size={100}
            icon={<UserOutlined />}
          />
        )}
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Full Name" content="Ngo trong van" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Account" content={user.username} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="City" content="Ha noi" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Country" content="Viet Nam" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Birthday" content="February 2,1900" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Role" content={user.role} />
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
        <Col span={24}>
          <DescriptionItem title="Department" content="Ăn bám" />
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
          <DescriptionItem title="Email" content={user.email} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="Facebook"
            content={
              <a href="http://github.com/ant-design/ant-design/">
                https://www.facebook.com/vannt1999/
              </a>
            }
          />
        </Col>
      </Row>
    </DrawerComponent>
  );
}

export default UserDetail;
