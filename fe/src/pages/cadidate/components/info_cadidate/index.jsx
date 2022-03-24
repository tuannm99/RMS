import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  Col,
  Row,
  Tabs,
  Button,
  Popconfirm,
  Select,
  Tooltip,
  Divider,
  Modal,
  Tag,
} from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { DrawerComponent } from '../../../../components';
import {
  cadidate_Id,
  cadidate,
} from '../../../../redux/stores/cadidate/selectors';
import { getCadidate } from '../../../../redux/stores/cadidate/actions';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Summary from './Summary';
import Edit_cadidate_profile from '../edit_cadidate_profile';
import Profile from './Profile';

const { Option } = Select;
const { TabPane } = Tabs;

function Cadidate_Info(props) {
  const { onclose, visible, cadidate_Id, getCadidate, cadidate } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (cadidate_Id !== '') {
      getCadidate(cadidate_Id);
    }
  }, [cadidate_Id]);

  console.log(cadidate);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <DrawerComponent
      onClose={onclose}
      visible={visible}
      closeable={false}
      width={'85vw'}
      bodyStyle={{ backgroundColor: '#ddd' }}
    >
      <Row gutter={20}>
        <Col md={{ span: 8 }} xxl={{ span: 6 }} className="main-info">
          <div className="cl-bg">
            <Row className="profile-cadidate">
              <Col span={12}>
                <Popconfirm title="Are you sure？">
                  <Button className="btn-profile_left">
                    Archive to Talent
                  </Button>
                </Popconfirm>
              </Col>
              <Col span={12}>
                <Button className="btn-profile_right">Advance</Button>
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
                <p><a href={cadidate?.resume?.hyperlink}>{cadidate?.resume?.hyperlink}</a></p>
                <p><Tag color="green">{cadidate?.status}</Tag></p>
              </Col>
              <Col span={24} className="pl-16 pr-16 apply">
                <p className="mb-0">APPLIED JOBS</p>
                <Button className="apply-btn" shape="round" size="large">
                  {cadidate?.jobId?.title}
                </Button>
              </Col>
              <Col span={24} className="status-info">
                <Tooltip placement="bottomLeft" title="search">
                  <Button type="primary" shape="circle" size="small">
                    1
                  </Button>
                </Tooltip>
                <Tooltip title="search">
                  <Button type="primary" shape="circle" size="small">
                    2
                  </Button>
                </Tooltip>
                <Tooltip title="search">
                  <Button type="primary" shape="circle" size="small">
                    3
                  </Button>
                </Tooltip>
                <Tooltip title="search">
                  <Button type="primary" shape="circle" size="small">
                    4
                  </Button>
                </Tooltip>
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
              <TabPane tab="Tab 3" key="3" className="pl-20 pr-20">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        closeIcon={true}
        closable={false}
        onCancel={handleCancel}
      >
        <Edit_cadidate_profile handleCancel={handleCancel} />
      </Modal>
    </DrawerComponent>
  );
}
const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  cadidate_Id: cadidate_Id,
});
const mapDispatchToProps = (dispatch) => ({
  getCadidate: (payload) => dispatch(getCadidate(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Cadidate_Info);
