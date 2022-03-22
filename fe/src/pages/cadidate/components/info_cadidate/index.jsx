import React from 'react';
import './styles.css';
import { Col, Row, Form, Button, Input, Popconfirm, Select } from 'antd';
import { EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import { DrawerComponent } from '../../../../components';
import { addCadidateServices } from '../../../../services/cadidateServices';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const { Option } = Select;

function Cadidate_Info(props) {
  const { onclose, visible } = props;

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
                  Vi Vu Vi Vu{' '}
                  <span>
                    <EditOutlined className="fs-12 cu" />
                  </span>
                </p>
                <p>asd@asdsa.com</p>
                <p>123113321</p>
              </Col>
              <Col span={24} className="pl-16 pr-16 apply">
                <p className="mb-0">APPLIED JOBS</p>
                <Button className="apply-btn" shape="round" size="large">
                  Software Engineering
                </Button>
              </Col>
              <Col span={24}></Col>
            </Row>
          </div>
        </Col>
        <Col md={{ span: 16 }} xxl={{ span: 18 }} className="main-info">
          <div className="cl-bg information-cadidate"></div>
        </Col>
      </Row>
    </DrawerComponent>
  );
}

export default Cadidate_Info;
