import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Form, DatePicker, Select, Empty } from 'antd';
import moment from 'moment';
import { DrawerComponent } from '../../../../components';
import { getAllUsersServices } from '../../../../services/employeeServices';
import { toast } from 'react-toastify';
import { hasResponseError } from '../../../../utils/utils';
import {
  cadidate_Id,
  cadidate,
} from '../../../../redux/stores/cadidate/selectors';
import {
  getCadidate,
  getAllCadidates,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  addIntervierServices,
  getAllInterviewsServices,
  getDetailInterviewsServices,
} from '../../../../services/cadidateServices';

const { Option } = Select;

function EditAddInterview(props) {
  const {
    onclose,
    visible,
    interviewerId,
    cadidate,
    totalResults,
    setTotalResults,
    setInterviews,
    setLoading,
  } = props;
  const [interviewer, setInterviewer] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    getAllInterviewer();
  }, []);

  useEffect(() => {
    if (interviewerId) {
      getDetailInterviewsServices(cadidate?.id, interviewerId).then((res) => {
        console.log(moment(res?.data?.interviewDate));
        form.setFieldsValue({
          Interviewer: res?.data?.interviewer,
          interviewDate: moment(res?.data?.interviewDate),
          Stages: res?.data?.stage,
          Duration: res?.data?.duration,
        });
      });
    } else {
      form.resetFields();
    }
  }, [interviewerId, cadidate?.id, form]);
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

  const onFinish = async (values) => {
    console.log(values);
    let body = {
      interviewer: values?.Interviewer,
      interviewDate: values?.interviewDate?._d.toISOString(),
      stage: values?.Stages,
      duration: values?.Duration,
    };
    if (interviewerId) {
      return;
    } else {
      if (totalResults > 4) {
        onclose();
        toast.error('Each interviewer can only add 5 schedule.');
        return;
      } else {
        const resAdd = await addIntervierServices(cadidate?.id, body);
        if (hasResponseError(resAdd)) {
          toast.error(resAdd.data.message);
          return;
        }
        setLoading(true);
        getAllInterviewsServices(cadidate?.id).then((res) => {
          setInterviews(res.data.results);
          setTotalResults(res.data.totalResults);
        });
        toast.success('Add schedule interview success!');
        onclose();
        setLoading(false);
        form.resetFields();
      }
    }
  };

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
        form={form}
        initialValues={{ prefix: '+84' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="interviewDate"
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
    </DrawerComponent>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
});
const mapDispatchToProps = (dispatch) => ({
  getCadidate: (payload) => dispatch(getCadidate(payload)),
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditAddInterview);
