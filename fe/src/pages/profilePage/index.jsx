import React, { useEffect, useState } from 'react';
import { Row, Col, Divider, Button, Avatar } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { GoLocation } from 'react-icons/go';
import './styles.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailUsersServices } from '../../services/employeeServices';
import { hasResponseError, imgURL } from '../../utils/utils';
import { toast } from 'react-toastify';
import moment from 'moment';

function ProfilePage() {
  /**
   * create state
   */
  const [user, setUser] = useState();

  const navigation = useNavigate();

  let { id } = useParams();

  /**
   * render detail page
   */
  useEffect(() => {
    getDetailUsersServices(id).then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`);
        return;
      }
      setUser(res.data);
    });
  }, [id]);

  /**
   * change page edit employee
   * @param {*} id
   */
  const handleEdit = (id) => {
    navigation(`/employee/true/${id}`);
  };
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Button className="fr mb-16" onClick={() => handleEdit(id)}>
          Edit Profile
        </Button>
      </Col>

      <Col span={7}>
        <div className="profile">
          <div className="profile-avatar">
            {!user?.avatar ? (
              <Avatar
                className="profile-avatar-img"
                size={80}
                icon={<UserOutlined />}
              />
            ) : (
              <Avatar
                className="profile-avatar-img"
                size={80}
                src={`${imgURL}${user?.avatar?.path}`}
              />
            )}
          </div>
          <div className="profile-information ml-28">
            <p className="profile-left-name">{user?.fullName}</p>
            <p className="profile-left-role">{user?.role}</p>
            {user?.address && (
              <p>
                <GoLocation /> <span>{user?.address}</span>
              </p>
            )}
            {user?.email && (
              <p>
                <MailOutlined /> <span>{user?.email}</span>
              </p>
            )}
            {user?.phone && (
              <p>
                <PhoneOutlined /> <span>{user?.phone}</span>
              </p>
            )}
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
            <p className="profile-inf-content-detail">
              {user?.fullName ? user?.fullName : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Date of Birth</p>
            <p className="profile-inf-content-detail">
              {user?.dateOfBirth
                ? moment.utc(user?.dateOfBirth).format('YYYY-MM-DD').toString()
                : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Address</p>
            <p className="profile-inf-content-detail">
              {user?.address ? user?.address : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Languages</p>
            <p className="profile-inf-content-detail">
              {user?.languages ? user?.languages : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Role</p>
            <p className="profile-inf-content-detail">
              {user?.role ? user?.role : '-'}
            </p>
          </Col>
        </Row>

        <Divider orientation="left">Contact</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Mail</p>
            <p className="profile-inf-content-detail">
              {user?.email ? user?.email : ''}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Phone</p>
            <p className="profile-inf-content-detail">
              {user?.phone ? user?.phone : '-'}
            </p>
          </Col>
        </Row>

        <Divider orientation="left">Company</Divider>
        <Row className="pl-16">
          <Col span={12}>
            <p className="profile-inf-title-detail">Position</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.employeeType
                ? user?.jobStatus?.employeeType
                : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Level</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.level ? user?.jobStatus?.level : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Department</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.department ? user?.jobStatus?.department : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Team</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.primaryTeam
                ? user?.jobStatus?.primaryTeam
                : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Status</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.employeeStatus
                ? user?.jobStatus?.employeeStatus
                : '-'}
            </p>
          </Col>
          <Col span={12}>
            <p className="profile-inf-title-detail">Date OF Joining</p>
            <p className="profile-inf-content-detail">
              {user?.jobStatus?.dateOfJoining
                ? moment
                    .utc(user?.jobStatus?.dateOfJoining)
                    .format('YYYY-MM-DD')
                    .toString()
                : '-'}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ProfilePage;
