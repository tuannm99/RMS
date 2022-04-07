import React, { useState, useEffect } from 'react';
import { Tabs, Select } from 'antd';
import './style.css';
import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Button } from 'antd/lib/radio';
import { Table } from '../../components';
import {
  getAllInterview,
  getDataChart,
} from '../../services/dashboardServices';
import { hasResponseError } from '../../utils/utils';
import { toast } from 'react-toastify';
import {
  customerTableHead,
  renderHeadTable,
  renderBodyTable,
} from './component/render';
import moment from 'moment';

function DashboardPage(props) {
  const [dataInterview, setDataInterview] = useState();
  const [dataChart, setDataChart] = useState();
  const { TabPane } = Tabs;
  const [key, setKey] = useState(1);
  const dateFormatList = 'DD/MM/YYYY';
  const { Option } = Select;
  const [param, setParam] = useState({
    limit: 3,
    page: 1,
  });

  useEffect(() => {
    loadDataDashboard(param);
  }, [param]);

  useEffect(() => {
    loadDataChart();
  }, []);

  const loadDataChart = () => {
    getDataChart().then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataChart(res.data);
      console.log(dataChart);
    });
  };

  const loadDataDashboard = (param) => {
    getAllInterview(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataInterview(res.data.results);
    });
  };

  function callback(key) {
    setKey(key);
  }

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

  return (
    <>
      <div className="dashBoard-top">
        <Select defaultValue="all" style={{ width: 120 }}>
          <Option value="all">all</Option>
          <Option value="for me">for me</Option>
        </Select>
        <Tabs
          className="dashBoard-top-center"
          defaultActiveKey="1"
          onChange={callback}
        >
          <TabPane tab="Today" key="1">
            <Table
              headData={customerTableHead}
              renderHead={(item, index) => renderHeadTable(item, index)}
              bodyData={dataInterview}
              renderBody={(item, index) => renderBodyTable(item, index)}
            />
          </TabPane>
          <TabPane tab="Upcoming" key="2">
            <Table
              headData={customerTableHead}
              renderHead={(item, index) => renderHeadTable(item, index)}
              bodyData={dataInterview}
              renderBody={(item, index) => renderBodyTable(item, index)}
            />
          </TabPane>
          <TabPane tab="Recently" key="3">
            <Table
              headData={customerTableHead}
              renderHead={(item, index) => renderHeadTable(item, index)}
              bodyData={dataInterview}
              renderBody={(item, index) => renderBodyTable(item, index)}
            />
          </TabPane>
        </Tabs>
      </div>
      <div className="dashBoard-center">
        <div className="dashBoard-center-chartJob">
          <Pie
            appendPadding={10}
            data={dataChart}
            angleField="value"
            colorField="type"
            radius={0.8}
            label={{
              type: 'outer',
            }}
            interactions={[
              {
                type: 'element-active',
              },
            ]}
          />
        </div>
        {/* <div className="dashBoard-center-chartJob2">
          <Column {...config3} />
        </div> */}
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

export default DashboardPage;
