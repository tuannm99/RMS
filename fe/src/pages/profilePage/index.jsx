import React from 'react';
import { Row, Col, Divider, Button, Avatar } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { GoLocation } from 'react-icons/go';
import './styles.css';
function ProfilePage(props) {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Button className="fr mb-16">Edit Profile</Button>
      </Col>
      <Col span={7}>
        <div className="profile">
          <div className="profile-avatar">
            <Avatar
              className="profile-avatar-img"
              size={80}
              icon={<UserOutlined />}
            />
          </div>
          <div className="profile-information ml-28">
            <p className="mt-32 mb-0 ">Văn Ngô</p>
            <p className="">E001</p>
            <p>
              <GoLocation /> <span> San Francisco, United States</span>
            </p>
            <p>
              <MailOutlined /> <span> vannthe130164@fpt.edu.vn</span>
            </p>
            <p>
              <PhoneOutlined /> <span> 01928374623</span>
            </p>
          </div>
        </div>
      </Col>

      <Col
        span={17}
        style={{
          backgroundColor: 'rgba(255, 228, 196, 0.219)',
          borderRadius: '8px',
        }}
      >
        <Divider orientation="left">Personal</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Name</p>
            <p className="profile-inf-content-detail">Ngô Trọng Văn</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Date of Birth</p>
            <p className="profile-inf-content-detail">-</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Address</p>
            <p className="profile-inf-content-detail">
              San Francisco, United States
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Role</p>
            <p className="profile-inf-content-detail">Admin</p>
          </Col>
        </Row>
        <Divider orientation="left">Contact</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Mail</p>
            <p className="profile-inf-content-detail">
              vannthe130164@fpt.edu.vn
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Phone</p>
            <p className="profile-inf-content-detail">01928374623</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Facebook</p>
            <p className="profile-inf-content-detail">dqdqdqdqdqqdq</p>
          </Col>
        </Row>
        <Divider orientation="left">Company</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Position</p>
            <p className="profile-inf-content-detail">leader</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Responsibilities</p>
            <p className="profile-inf-content-detail">Coding</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Department</p>
            <p className="profile-inf-content-detail">Xtech</p>
          </Col>
          <Col span={24}>
            <p className="profile-inf-title-detail">Skill</p>
            <p className="profile-inf-content-detail">01928374623</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ProfilePage;
