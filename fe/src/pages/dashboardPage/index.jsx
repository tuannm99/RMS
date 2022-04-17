import React, { useState, useEffect } from 'react';
import { Tabs, Select, Pagination } from 'antd';
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
} from '../../services/dashboardServices';
import { hasResponseError } from '../../utils/utils';
import { toast } from 'react-toastify';
import {
  customerTableHead,
  renderHeadTable,
  renderBodyTable,
} from './component/render';
import { selectUserInfor } from '../../redux/stores/auth/selectors';

const { TabPane } = Tabs;

function DashboardPage(props) {
  const [dataInterview, setDataInterview] = useState();
  const [dataChart, setDataChart] = useState([]);
  const [dataChartSex, setDataChartSex] = useState([]);
  const [dataSnapshot, setDataSnapshot] = useState([]);
  const [dataCountRejected, setDataCountRejected] = useState([]);
  const [DataCountApproved, setDataCountApproved] = useState([]);
  const [key, setKey] = useState(1);
  const { Option } = Select;
  const { userAccount } = props;
  const [param, setParam] = useState({
    limit: 3,
    page: 1,
    interviewDate: 'upcoming',
    sortBy: 'interviewDate:asc',
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
    }
  }

  const loadDataInterview = (param) => {
    getAllInterview(param).then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setDataInterview(res.data);
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

  return (
    <>
      <div className="dashBoard-container">
        <div className="dashBoard-top">
          <div className="dashBoard-center-header">
            Interviews
            {userAccount.role !== 'hiringManager' && true ? (
              <Select
                defaultValue="for me"
                style={{ width: 120 }}
                className="dashBoard-select"
              >
                <Option value="for me">For Me</Option>
              </Select>
            ) : (
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                className="dashBoard-select"
                onSelect={handleChange}
              >
                <Option value="all">Overall</Option>
                <Option value="for me">For Me</Option>
              </Select>
            )}
          </div>

          <Tabs
            className="dashBoard-top-center"
            defaultActiveKey="upcoming"
            onChange={handleTab}
          >
            <TabPane tab="Upcoming" key="upcoming">
              {dataInterview && (
                <Table
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHeadTable(item, index)}
                  bodyData={dataInterview?.results}
                  renderBody={(item, index) => renderBodyTable(item, index)}
                />
              )}
            </TabPane>
            <TabPane tab="Recently" key="recently">
              {dataInterview && (
                <Table
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHeadTable(item, index)}
                  bodyData={dataInterview?.results}
                  renderBody={(item, index) => renderBodyTable(item, index)}
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
        <div className="dashboard-right">
          <h1>HR SnapShot</h1>
          <div className="dashboard-snapshot">
            <div className="dashboard-snapshot-content">
              <AiOutlineUserAdd className="dashboard-snapshot-icons dashboard-snapshot-total" />{' '}
              {dataSnapshot}
              <div>
                <h5> Total Candidate </h5>
              </div>
            </div>
          </div>
          <div className="dashboard-snapshot">
            <div className="dashboard-snapshot-content ">
              <AiOutlineUserDelete className="dashboard-snapshot-icons dashboard-snapshot-add" />{' '}
              {dataCountRejected}
              <div>
                <h5>Candidate Rejected</h5>
              </div>
            </div>
          </div>
          <div className="dashboard-snapshot dashboard-snapshot-last">
            <div className="dashboard-snapshot-content">
              <AiOutlineUserSwitch className="dashboard-snapshot-icons" />
              {DataCountApproved}
              <div>
                <h5>Candidate Approved</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashBoard-center">
        <div className="dashBoard-center-chartJob">
          <Pie {...config} />
        </div>
        <div className="dashBoard-center-chartJob chartSex">
          <Pie {...configChartSex} />
        </div>
      </div>
      <div className="dashBoard-center">
        {/* <div className="dashBoard-center-chartJob">
          <Pie {...config} />
        </div> */}
        {/* <div className="dashBoard-center-chartJob2">
          <Pie {...configg} />
        </div> */}
      </div>
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
