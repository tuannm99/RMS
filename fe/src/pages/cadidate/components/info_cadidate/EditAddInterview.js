import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Row,
  DatePicker,
  Select,
  Typography,
  List,
  Divider,
  Spin,
  Form,
} from 'antd';
import moment from 'moment';
import { DrawerComponent } from '../../../../components';
import { getAllUsersServices } from '../../../../services/employeeServices';
import { toast } from 'react-toastify';
import { hasResponseError } from '../../../../utils/utils';
import {
  cadidate,
  interviews,
} from '../../../../redux/stores/cadidate/selectors';
import { getAllInterviews } from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  addIntervierServices,
  getAllInfoInterviewerServices,
  getDetailInterviewsServices,
  updateIntervierServices,
} from '../../../../services/cadidateServices';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Option } = Select;

function EditAddInterview(props) {
  const {
    onclose,
    visible,
    interviewerId,
    cadidate,
    interviews,
    getAllInterviews,
    setIdIntervier,
    idInterviewer,
    setDateInterview,
    dateInterview,
    setNameInterviewer,
    nameInterviewer,
  } = props;
  const [interviewer, setInterviewer] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllInterviewer();
  }, []);

  useEffect(() => {
    if (interviewer && idInterviewer) {
      const interviewerDetail = interviewer.filter(
        (item) => item.id === idInterviewer
      );
      setNameInterviewer(interviewerDetail);
    }
  }, [idInterviewer, interviewer, setNameInterviewer]);

  useEffect(() => {
    if (interviewerId) {
      getDetailInterviewsServices(cadidate?.id, interviewerId)
        .then(setLoading(true))
        .then((res) => {
          form.setFieldsValue({
            Interviewer: res?.data?.interviewer,
            interviewDate: moment(res?.data?.interviewDate),
            Stages: res?.data?.stage,
            Duration: res?.data?.duration,
          });
          setIdIntervier(res?.data?.interviewer);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      form.resetFields();
    }
  }, [interviewerId, cadidate?.id, form]);

  useEffect(() => {
    if (idInterviewer) {
      getInfo();
    } else {
      form.resetFields();
    }
  }, [idInterviewer, setDateInterview]);

  const getInfo = () => {
    getAllInfoInterviewerServices({
      interviewer: idInterviewer,
    }).then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      const data = res?.data?.results;
      const dataFilter = data.filter((item) => {
        const now = new Date();
        return moment(now).isBefore(moment(item.interviewDate));
      });
      setDateInterview(dataFilter);
    });
  };

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
    const now = new Date();
    return current < now;
  };

  const range = (start, end, start1, end1) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    for (let i = start1; i < end1; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => {
    return {
      disabledHours: () => {
        return range(0, 8, 19, 24);
      },
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

  const onFinish = async (values) => {
    let body = {
      interviewer: values?.Interviewer,
      interviewDate: values?.interviewDate?._d.toISOString(),
      stage: values?.Stages,
      duration: values?.Duration,
    };
    if (interviewerId) {
      const resEdit = await updateIntervierServices(
        cadidate?.id,
        interviewerId,
        body
      );
      if (hasResponseError(resEdit)) {
        toast.error(resEdit.data.message);
        return;
      }
      toast.success('Edit schedule interview success!');
    } else {
      if (interviews?.length > 4) {
        onclose();
        toast.error('Each interviewer can only add 5 schedule.');
        return;
      } else {
        const resAdd = await addIntervierServices(cadidate?.id, body);
        if (hasResponseError(resAdd)) {
          toast.error(resAdd.data.message);
          return;
        }
        toast.success('Add schedule interview success!');
      }
    }
    await getAllInterviews(cadidate?.id);
    onclose();
  };
  return (
    <DrawerComponent
      title="SCHEDULE INTERVIEW"
      onClose={onclose}
      visible={visible}
      width={600}
    >
      {loading && (
        <Col span={24} className="text-center">
          <Spin />
        </Col>
      )}
      {!loading && (
        <>
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={{ prefix: '+84' }}
          >
            <Row gutter={16}>
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
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => setIdIntervier(value)}
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
              {idInterviewer && (
                <>
                  <Col span={12}>
                    <Form.Item
                      name="Stages"
                      label="Stages"
                      rules={[
                        { required: true, message: 'Please enter Stages!' },
                      ]}
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
                      name="interviewDate"
                      label="Interview Date "
                      rules={[
                        {
                          required: true,
                          message: 'Please enter Interview Date !',
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: '100%' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        disabledTime={disabledDateTime}
                        showTime={{
                          defaultValue: moment('08:00:00', 'HH:mm:ss'),
                        }}
                        showNow={false}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Duration"
                      label="Duration"
                      rules={[
                        { required: true, message: 'Please enter Duration!' },
                      ]}
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                    style={{ position: 'absolute', top: '10px', right: '15px' }}
                  >
                    {interviewerId ? `Edit Schedule` : 'Add Schedule'}
                  </Button>
                </>
              )}
            </Row>
          </Form>
          <Row>
            <Col span={24}>
              <Row>
                {dateInterview && nameInterviewer && (
                  <>
                    <Col span={24} className="mt-32 mb-32">
                      <Typography.Text italic>
                        Schedule interview of
                      </Typography.Text>
                      <Typography.Text
                        type="success"
                        className="ml-8"
                        strong
                        style={{ fontSize: 24 }}
                      >
                        {nameInterviewer[0].fullName}
                      </Typography.Text>
                    </Col>
                    <div
                      id="scrollableDiv"
                      style={{
                        width: '100%',
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        borderRadius: '10px',
                      }}
                    >
                      <InfiniteScroll
                        dataLength={dateInterview.length}
                        scrollableTarget="scrollableDiv"
                        endMessage={
                          <Divider plain>It is all, nothing more 🤐</Divider>
                        }
                      >
                        <List
                          dataSource={dateInterview}
                          renderItem={(item) => (
                            <List.Item key={item.id}>
                              <Col span={12}>
                                <Typography.Text type="danger">
                                  {moment(item.interviewDate).format(
                                    'YYYY/MM/DD'
                                  )}
                                </Typography.Text>
                                <Typography.Text
                                  type="danger"
                                  className="ml-8 mr-8"
                                >
                                  -
                                </Typography.Text>
                                <Typography.Text type="danger" className="">
                                  {moment(item.interviewDate).format('HH:mm')}
                                </Typography.Text>
                                <Typography.Text
                                  type="danger"
                                  className="ml-8 mr-8"
                                >
                                  -
                                </Typography.Text>
                                <Typography.Text type="danger">
                                  {item?.duration < 60
                                    ? `(${item?.duration}Mins)`
                                    : item?.duration % 60 !== 0
                                    ? `(${Math.floor(item?.duration / 60)}Hr${
                                        item?.duration % 60
                                      }Mins)`
                                    : `(${item?.duration / 60}Hr)`}
                                </Typography.Text>
                              </Col>
                              <Col span={12}>
                                <Typography.Text className="fr" strong mark>
                                  {item?.candidateId.fullName}
                                </Typography.Text>
                              </Col>
                            </List.Item>
                          )}
                        />
                      </InfiniteScroll>
                    </div>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </DrawerComponent>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  interviews: interviews,
});
const mapDispatchToProps = (dispatch) => ({
  getAllInterviews: (payload) => dispatch(getAllInterviews(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditAddInterview);
