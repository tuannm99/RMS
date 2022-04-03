import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Empty,
  Avatar,
} from 'antd';
import moment from 'moment';
import { DrawerComponent } from '../../../../components';
import { getAllUsersServices } from '../../../../services/employeeServices';
import { toast } from 'react-toastify';
import { hasResponseError } from '../../../../utils/utils';
import { imgURL } from '../../../../utils/utils';

const { Option } = Select;

function EditAddInterview(props) {
  const { onclose, visible } = props;
  const [interviewer, setInterviewer] = useState();

  useEffect(() => {
    getAllInterviewer();
  }, []);

  const getAllInterviewer = async (params) => {
    const res = await getAllUsersServices(params);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    setInterviewer(res.data.results);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => {
    return {
      disabledSeconds: () => range(0, 60),
    };
  };

  const desc = ['contact', 'test', 'technical', 'cultureFit'];

  const durationTime = [
    { value: 15, label: '15 Mins' },
    { value: 30, label: '30 Mins' },
    { value: 45, label: '55 Mins' },
    { value: 60, label: '1 Hr' },
    { value: 90, label: '1 Hr 30 Mins' },
    { value: 120, label: '2 Hrs' },
    { value: 150, label: '2 Hrs 30 Mins' },
    { value: 180, label: '3 Hrs' },
  ];

  const stylesEmpty = {
    width: '100%',
    background: 'linear-gradient(0deg,#fff 0,#f5f7f9 100%)',
    padding: '50px 0',
    borderRadius: '5px',
    marginTop: '50px',
    marginLeft: '0',
    marginRight: '0',
  };

  const onFinish = (values) => {};

  return (
    <DrawerComponent
      title="SCHEDULE INTERVIEW"
      onClose={onclose}
      visible={visible}
      width={600}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ prefix: '+84' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="InterviewDate "
              label="Interview Date "
              rules={[
                { required: true, message: 'Please enter Interview Date !' },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Duration"
              label="Duration"
              rules={[{ required: true, message: 'Please enter Duration!' }]}
            >
              <Select style={{ width: '100%' }}>
                {durationTime.map((item, index) => (
                  <Option value={item.value} key={index}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Stages"
              label="Stages"
              rules={[{ required: true, message: 'Please enter Stages!' }]}
            >
              <Select style={{ width: '100%' }}>
                {desc.map((item, index) => (
                  <Option value={item} key={index}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Interviewer"
              label="Interviewer"
              rules={[
                {
                  required: true,
                  message: 'Please enter Interviewer!',
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {interviewer &&
                  interviewer.map((item) => {
                    return (
                      item.role !== 'admin' && (
                        <Option value={item.id} key={item.id}>
                          {item.fullName}
                        </Option>
                      )
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Add Schedule
        </Button>
      </Form>
      <Row>
        <Col span={24}>
          <Empty description={false} style={stylesEmpty} />
        </Col>
      </Row>
    </DrawerComponent>
  );
}

export default EditAddInterview;
