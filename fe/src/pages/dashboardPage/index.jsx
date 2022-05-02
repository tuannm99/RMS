import React, { useState, useEffect } from 'react';
import { Tabs, Select, Pagination, Spin, Col, Row } from 'antd';
import './style.css';
import { Pie } from '@ant-design/plots';
import { Table } from '../../components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as action from '../../redux/stores/job/actions';
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
} from 'react-icons/ai';
import {
  getAllInterview,
  getDataChart,
  getDataChartSex,
  getDataCountCandidate,
  getDataCountRejected,
  getDataCountApproved,
  getDataChartRole,
} from '../../services/dashboardServices';
import { hasResponseError } from '../../utils/utils';
import { toast } from 'react-toastify';
import {
  customerTableHead,
  renderHeadTable,
  renderBodyTable,
} from './component/render';
import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
function DashboardPage(props) {
  const [dataInterview, setDataInterview] = useState();
  const [dataChart, setDataChart] = useState([]);
  const [dataChartSex, setDataChartSex] = useState([]);
  const [dataSnapshot, setDataSnapshot] = useState([]);
  const [dataChartRole, setDataChartRole] = useState([]);
  const [dataCountRejected, setDataCountRejected] = useState([]);
  const [DataCountApproved, setDataCountApproved] = useState([]);
  const [key, setKey] = useState(1);
  const { Option } = Select;
  const { userAccount } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [param, setParam] = useState({
    limit: 3,
    page: 1,
    interviewDate: 'upcoming',
    sortBy: 'interviewDate:asc',
    interviewer: userAccount.id,
  });

  function handleChange(value) {
    if (value === 'for me') {
      setParam({ ...param, interviewer: userAccount.id });
    } else {
      delete param['interviewer'];
      setParam({ ...param });
    }
  }

  useEffect(() => {
    loadDataInterview(param);
  }, [param]);

  useEffect(() => {
    loadDataChart();
  }, []);

  function handleTab(key) {
    if (key === 'upcoming') {
      setParam({ ...param, sortBy: 'interviewDate:asc', interviewDate: key });
    } else if (key === 'recently') {
      setParam({ ...param, sortBy: 'interviewDate:desc', interviewDate: key });
    } else if (key === 'today') {
      setParam({ ...param, sortBy: 'interviewDate:asc', interviewDate: key });
    }
  }

  const loadDataInterview = (param) => {
    setLoading(true);
    getAllInterview(param).then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setDataInterview(res.data);
      setLoading(false);
    });
  };

  const loadDataChart = () => {
    getDataChart().then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      setDataChart(res.data);
    });

    getDataChartRole().then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      setDataChartRole(res.data);
    });

    getDataCountRejected().then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setDataCountRejected(res.data);
    });

    getDataCountCandidate().then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setDataSnapshot(res.data);
    });

    getDataCountApproved().then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      setDataCountApproved(res.data);
    });

    getDataChartSex().then((res) => {
      if (hasResponseError(res)) {
        toast.error(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataChartSex(res.data);
    });
  };

  const handleChangeData = (pagination) => {
    setParam({ ...param, page: pagination });
    loadDataInterview({ ...param, page: pagination });
  };

  const config = {
    appendPadding: 10,
    data: dataChart,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const configChartSex = {
    appendPadding: 10,
    data: dataChartSex,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'RMS',
      },
    },
  };

  const configChartRole = {
    appendPadding: 10,
    data: dataChartRole,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'RMS',
      },
    },
  };

  return (
    <>
      <Row>
        <Col
          md={{ span: 18 }}
          xl={{ span: 19 }}
          style={{ marginBottom: '20px' }}
        >
          <div className="dashBoard-center-header fr">
            <span className="mr-8">Interviews</span>
            {userAccount.role !== 'hiringManager' && true ? (
              <Select
                defaultValue="for me"
                style={{ width: 120 }}
                onSelect={handleChange}
                className="dashBoard-select"
              >
                <Option value="for me">For Me</Option>
              </Select>
            ) : (
              <Select
                defaultValue="for me"
                style={{ width: 120 }}
                className="dashBoard-select"
                onSelect={handleChange}
              >
                <Option value="all">Overall</Option>
                <Option value="for me">For Me</Option>
              </Select>
            )}
          </div>
        </Col>
        <Col md={{ span: 18 }} xl={{ span: 19 }}>
          <Row>
            <Col span={24}>
              <div className="dashBoard-top">
                <Tabs
                  className="dashBoard-top-center"
                  defaultActiveKey="upcoming"
                  onChange={handleTab}
                >
                  <TabPane tab="Today" key="today">
                    {loading ? (
                      <Col style={{ textAlign: 'center' }} span={24}>
                        <Spin tip="loading..." />
                      </Col>
                    ) : (
                      <Table
                        headData={customerTableHead}
                        renderHead={(item, index) =>
                          renderHeadTable(item, index)
                        }
                        bodyData={dataInterview?.results}
                        renderBody={(item, index) =>
                          renderBodyTable(item, index, navigate)
                        }
                      />
                    )}
                  </TabPane>
                  <TabPane tab="Upcoming" key="upcoming">
                    {loading ? (
                      <Col style={{ textAlign: 'center' }} span={24}>
                        <Spin tip="loading..." />
                      </Col>
                    ) : (
                      <Table
                        headData={customerTableHead}
                        renderHead={(item, index) =>
                          renderHeadTable(item, index)
                        }
                        bodyData={dataInterview?.results}
                        renderBody={(item, index) =>
                          renderBodyTable(item, index, navigate)
                        }
                      />
                    )}
                  </TabPane>
                  <TabPane tab="Recently" key="recently">
                    {loading ? (
                      <Col style={{ textAlign: 'center' }} span={24}>
                        <Spin tip="loading..." />
                      </Col>
                    ) : (
                      <Table
                        headData={customerTableHead}
                        renderHead={(item, index) =>
                          renderHeadTable(item, index)
                        }
                        bodyData={dataInterview?.results}
                        renderBody={(item, index) =>
                          renderBodyTable(item, index, navigate)
                        }
                      />
                    )}
                  </TabPane>
                </Tabs>
                {dataInterview && (
                  <Pagination
                    pageSize={dataInterview?.limit}
                    current={dataInterview?.page}
                    total={dataInterview?.totalResults}
                    onChange={handleChangeData}
                    className="fr dashboard-Pagination"
                  />
                )}
              </div>
            </Col>
            <Col span={24}>
              <div className="dashBoard-center">
                <Row className="mt-32 mb-20" gutter={20}>
                  <Col md={{ span: 24 }} xl={{ span: 12 }} className="mb-20">
                    <div
                      className="chard-department"
                      style={{ background: '#FFF', borderRadius: '6px' }}
                    >
                      <Pie {...config} />
                      <h5>Chart Department</h5>
                    </div>
                  </Col>
                  <Col md={{ span: 24 }} xl={{ span: 12 }} className="mb-20">
                    <div
                      className="chard-sex"
                      style={{ background: '#FFF', borderRadius: '6px' }}
                    >
                      <Pie {...configChartSex} />
                      <h5>Chart Department</h5>
                    </div>
                  </Col>
                </Row>
                <Row className="mt-32 mb-20" gutter={20}>
                  <Col md={{ span: 24 }} xl={{ span: 12 }} className="mb-20">
                    <div
                      style={{ background: '#FFF', borderRadius: '6px' }}
                      className="chard-department"
                    >
                      <Pie {...configChartRole} />
                      <h5>Chart Department</h5>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 6 }} xl={{ span: 5 }}>
          <div className="dashboard-right">
            <h1>SnapShot</h1>
            <div className="dashboard-snapshot">
              <div className="dashboard-snapshot-content">
                <div className="mount">
                  <AiOutlineUserAdd
                    className="dashboard-snapshot-icons dashboard-snapshot-total"
                    style={{ color: 'steelblue' }}
                  />{' '}
                  <span className="ml-8 number" style={{ color: 'steelblue' }}>
                    {dataSnapshot}
                  </span>
                </div>
                <div>
                  <h5 style={{ color: 'steelblue' }}> Total Candidate </h5>
                </div>
              </div>
            </div>
            <div className="dashboard-snapshot">
              <div className="dashboard-snapshot-content ">
                <div className="mount">
                  <AiOutlineUserDelete
                    className="dashboard-snapshot-icons dashboard-snapshot-add"
                    style={{ color: 'red' }}
                  />{' '}
                  <span className="ml-8 number" style={{ color: 'red' }}>
                    {dataCountRejected}
                  </span>
                </div>
                <div>
                  <h5 style={{ color: 'red' }}>Candidate Rejected</h5>
                </div>
              </div>
            </div>
            <div className="dashboard-snapshot dashboard-snapshot-last">
              <div className="dashboard-snapshot-content">
                <div className="mount">
                  <AiOutlineUserSwitch
                    className="dashboard-snapshot-icons"
                    style={{ color: 'darkgreen' }}
                  />
                  <span className="ml-8 number" style={{ color: 'darkgreen' }}>
                    {DataCountApproved}
                  </span>
                </div>
                <div>
                  <h5 style={{ color: 'darkgreen' }}>Candidate Approved</h5>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  setJobId: (payload) => dispatch(action.setJobId(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(DashboardPage);
