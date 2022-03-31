import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  Col,
  Row,
  Tabs,
  Button,
  Popconfirm,
  Divider,
  Modal,
  Tag,
  Rate,
  Spin,
  Dropdown,
  Menu,
} from 'antd';
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { DrawerComponent } from '../../../../components';
import {
  cadidate_Id,
  cadidate,
  loading,
} from '../../../../redux/stores/cadidate/selectors';
import {
  getCadidate,
  editCadidate,
  getAllCadidates,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Summary from './Summary';
import EditCadidateProfile from '../edit_cadidate_profile';
import Profile from './Profile';
import Interview from './Interview';

const { TabPane } = Tabs;

function CadidateInfo(props) {
  const {
    onclose,
    visible,
    id,
    getCadidate,
    cadidate,
    params,
    editCadidate,
    isloading,
    getAllCadidates,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (id !== '') {
      getCadidate(id);
    }
  }, [id, getCadidate]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleReject = async () => {
    console.log(id);
    const body = {
      status: 'reject',
    };
    await editCadidate({ id, body });
    getCadidate(id);
    getAllCadidates(params);
  };

  const desc = ['contact', 'test', 'technical', 'cultureFit'];

  const handleRate = ({ index, value }) => {
    if (index < value) {
      return (
        <Button type="primary" shape="circle" size="small">
          {index + 1}
        </Button>
      );
    } else {
      return (
        <Button shape="circle" size="small">
          {index + 1}
        </Button>
      );
    }
  };

  const handleMenuClick = async ({ key }) => {
    const body = {
      stage: key,
    };
    await editCadidate({ id, body });
    getCadidate(id);
    getAllCadidates(params);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {desc.map((item) => (
        <Menu.Item key={item} disabled={cadidate.stage === item && true}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <DrawerComponent
      onClose={onclose}
      visible={visible}
      closeable={false}
      width={'85vw'}
      bodyStyle={{ backgroundColor: '#ddd' }}
    >
      <Row gutter={20}>
        {isloading ? (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Spin />
          </Col>
        ) : (
          <>
            <Col md={{ span: 8 }} xxl={{ span: 6 }} className="main-info">
              <div className="cl-bg">
                <Row className="profile-cadidate">
                  <Col span={12}>
                    <Popconfirm
                      title="Are you profile cadidate？"
                      onConfirm={() => handleReject()}
                      placement="rightBottom"
                      disabled={cadidate?.status === 'reject' && true}
                    >
                      <Button
                        className="btn-profile_left"
                        disabled={cadidate?.status === 'reject' && true}
                      >
                        Reject Cadidate
                      </Button>
                    </Popconfirm>
                  </Col>
                  <Col span={12}>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <Button className="btn-profile_right">
                        Advance <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="cadidate-name">
                    <p>
                      {cadidate?.fullName}
                      <span onClick={showModal}>
                        <EditOutlined className="fs-12 cu" />
                      </span>
                    </p>
                    <p>
                      <a
                        href={cadidate?.resume?.hyperlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cadidate?.resume?.hyperlink}
                      </a>
                    </p>
                    <p>
                      {cadidate?.status === 'open' ? (
                        <Tag color="green">{cadidate?.status}</Tag>
                      ) : cadidate?.status === 'reject' ? (
                        <Tag color="red">{cadidate?.status}</Tag>
                      ) : (
                        <Tag color="geekblue">{cadidate?.status}</Tag>
                      )}
                    </p>
                  </Col>
                  <Col span={24} className="pl-16 pr-16 apply">
                    <p className="mb-0">APPLIED JOBS</p>
                    <Button className="apply-btn" shape="round" size="large">
                      {cadidate?.jobId?.title}
                    </Button>
                  </Col>
                  <Col span={24} className="status-info">
                    <Rate
                      count={4}
                      tooltips={desc}
                      disabled="true"
                      value={1 + desc.findIndex((e) => e === cadidate.stage)}
                      character={({ index, value }) =>
                        handleRate({ index, value })
                      }
                    />
                  </Col>
                  <Col span={24} className="pl-16 pr-16 apply">
                    <p className="mb-0">OWNER</p>
                    <Button
                      className="owner-btn"
                      shape="round"
                      size="large"
                      style={{ fontSize: 15 }}
                    >
                      Tuan Nguyen
                    </Button>
                  </Col>
                </Row>
                <Divider />
                <p className="pr-16 pl-16 profile-contact-title">CONTACT</p>
                <p className="pr-16 pl-16 cm">
                  <MailOutlined /> : <span>{cadidate?.email}</span>
                </p>
                <p className="pr-16 pl-16 cm">
                  <PhoneOutlined /> : <span>{cadidate?.phone}</span>
                </p>
              </div>
            </Col>
            <Col md={{ span: 16 }} xxl={{ span: 18 }} className="main-info">
              <div className="cl-bg information-cadidate">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Summary" key="1" className="pl-20 pr-20">
                    <Summary />
                  </TabPane>
                  <TabPane tab="Profile" key="2" className="pl-20 pr-20">
                    <Profile />
                  </TabPane>
                  <TabPane tab="Interviews" key="3" className="pl-20 pr-20">
                    <Interview />
                  </TabPane>
                </Tabs>
              </div>
            </Col>
          </>
        )}
      </Row>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        closeIcon={true}
        closable={false}
        onCancel={handleCancel}
      >
        <EditCadidateProfile handleCancel={handleCancel} params={params} />
      </Modal>
    </DrawerComponent>
  );
}
const mapStateToProps = createStructuredSelector({
  isloading: loading,
  cadidate: cadidate,
  id: cadidate_Id,
});
const mapDispatchToProps = (dispatch) => ({
  editCadidate: (payload) => dispatch(editCadidate(payload)),
  getCadidate: (payload) => dispatch(getCadidate(payload)),
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CadidateInfo);
