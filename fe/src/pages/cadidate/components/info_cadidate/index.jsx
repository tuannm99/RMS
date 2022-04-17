import React, { useEffect, useState } from 'react';
import './styles.css';
import {
  Col,
  Row,
  Tabs,
  Button,
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
  loadingCadidate,
} from '../../../../redux/stores/cadidate/selectors';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import {
  getCadidate,
  getAllCadidates,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Summary from './Summary';
import EditCadidateProfile from '../edit_cadidate_profile';
import Profile from './Profile';
import Interview from './Interview';
import { hasResponseError, imgURL } from '../../../../utils/utils';
import { updateCadidateServices } from '../../../../services/cadidateServices';
import { toast } from 'react-toastify';
import Mail from './Mail';
const { TabPane } = Tabs;

function CadidateInfo(props) {
  const {
    onclose,
    visible,
    id,
    getCadidate,
    cadidate,
    params,
    account,
    loadingCadidate,
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

  const desc = ['contact', 'test', 'technical', 'cultureFit'];

  const descStatus = ['open', 'approve', 'reject'];

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
    const formRes = new FormData();

    const body = {
      stage: key,
    };
    formRes.append('candidate', JSON.stringify(body));
    const resEdit = await updateCadidateServices({ id, body: formRes });
    if (hasResponseError(resEdit)) {
      toast.error(resEdit.data.message);
      return;
    }
    toast.success(`You changed your stage to ${key}!`);
    getCadidate(id);
  };

  const handleMenuStatusClick = async ({ key }) => {
    const formRes = new FormData();
    const body = {
      status: key,
    };
    formRes.append('candidate', JSON.stringify(body));
    const resEdit = await updateCadidateServices({ id, body: formRes });
    if (hasResponseError(resEdit)) {
      toast.error(resEdit.data.message);
      return;
    }
    toast.success(`You changed your status to ${key}!`);
    getCadidate(id);
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

  const menuStatus = (
    <Menu onClick={handleMenuStatusClick}>
      {descStatus.map((item) => (
        <Menu.Item key={item} disabled={cadidate.status === item && true}>
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
        <Col md={{ span: 8 }} xxl={{ span: 6 }} className="main-info">
          <div className="cl-bg">
            <Row className="profile-cadidate">
              <Col span={12}>
                <Dropdown
                  overlay={menuStatus}
                  trigger={['click']}
                  disabled={account?.role !== 'hiringManager' && true}
                >
                  <Button className="btn-profile_right">
                    Status <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
              <Col span={12}>
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  disabled={account?.role !== 'hiringManager' && true}
                >
                  <Button className="btn-profile_right">
                    Advance <DownOutlined />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              {loadingCadidate ? (
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Spin />
                </Col>
              ) : (
                <>
                  <Col span={24} className="cadidate-name">
                    <p>
                      {cadidate?.fullName}
                      {account?.role === 'hiringManager' && (
                        <span onClick={showModal}>
                          <EditOutlined className="fs-12 cu" />
                        </span>
                      )}
                    </p>
                    <p>
                      <a
                        href={cadidate?.hyperlink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {cadidate?.hyperlink}
                      </a>
                    </p>
                    <p>
                      {cadidate?.sex === 'male' ? (
                        <Tag color="green">Male</Tag>
                      ) : cadidate?.sex === 'female' ? (
                        <Tag color="green">Female</Tag>
                      ) : (
                        <Tag color="green">Other</Tag>
                      )}
                    </p>
                  </Col>
                  <Col span={24} className="pl-16 pr-16 apply">
                    <p className="mb-0">APPLIED JOBS</p>
                    <Button className="apply-btn" size="large">
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
                    <p className="mb-0">CURRICULUM VITAE</p>
                    <a
                      href={`${imgURL}${cadidate?.cv?.path}`}
                      target="_blank"
                      rel="noreferrer"
                    >{`${imgURL}${cadidate?.cv?.path}`}</a>
                  </Col>
                </>
              )}
            </Row>
            {!loadingCadidate && (
              <>
                <Divider />
                <p className="pr-16 pl-16 profile-contact-title">CONTACT</p>
                <p className="pr-16 pl-16 cm">
                  <MailOutlined /> : <span>{cadidate?.email}</span>
                </p>
                <p className="pr-16 pl-16 cm">
                  <PhoneOutlined /> : <span>{cadidate?.phone}</span>
                </p>
              </>
            )}
          </div>
        </Col>
        <Col md={{ span: 16 }} xxl={{ span: 18 }} className="main-info">
          <div className="cl-bg information-cadidate">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Summary" key="1" className="pl-20 pr-20">
                <Summary />
              </TabPane>
              <TabPane tab="CV" key="2" className="pl-20 pr-20">
                <Profile />
              </TabPane>
              <TabPane tab="Interviews" key="3" className="pl-20 pr-20">
                <Interview />
              </TabPane>
              <TabPane tab="Mail" key="4" className="pl-20 pr-20">
                <Mail />
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
      <Modal
        title="EDIT INFORMATION CANDIDATE"
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
  cadidate: cadidate,
  id: cadidate_Id,
  account: selectUserInfor,
  loadingCadidate: loadingCadidate,
});
const mapDispatchToProps = (dispatch) => ({
  getCadidate: (payload) => dispatch(getCadidate(payload)),
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CadidateInfo);
