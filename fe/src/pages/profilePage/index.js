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
            <p className="profile-inf-title-detail">Gender</p>
            <p className="profile-inf-content-detail">Male</p>
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
            <p className="profile-inf-title-detail">Marital Status</p>
            <p className="profile-inf-content-detail">-</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Languages</p>
            <p className="profile-inf-content-detail">-</p>
          </Col>
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
        </Row>
        <Divider orientation="left">Job</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Employee Id</p>
            <p className="profile-inf-content-detail">E001</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Employee Status</p>
            <p className="profile-inf-content-detail">Active</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Date Of Joining</p>
            <p className="profile-inf-content-detail">Feb-11-2022</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Employee Type</p>
            <p className="profile-inf-content-detail">Full Time</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Department</p>
            <p className="profile-inf-content-detail">Administration</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Designation or Title</p>
            <p className="profile-inf-content-detail">-</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Primary Team</p>
            <p className="profile-inf-content-detail">Business</p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Level</p>
            <p className="profile-inf-content-detail">-</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ProfilePage;
