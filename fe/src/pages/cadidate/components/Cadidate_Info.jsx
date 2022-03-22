import React from 'react';
import { Col, Row, Form, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { DrawerComponent } from '../../../components';
import { addCadidateServices } from '../../../services/cadidateServices';
import { hasResponseError } from '../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

function Cadidate_Info(props) {
  const { onclose, visible } = props;

  return (
    <DrawerComponent
      title="ADD CADIDATE"
      onClose={onclose}
      visible={visible}
    ></DrawerComponent>
  );
}

export default Cadidate_Info;
