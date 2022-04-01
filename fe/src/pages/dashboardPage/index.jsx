import React, { useState, useEffect } from 'react';
import { Tabs, Select } from 'antd';
import './style.css';
import { Pie } from '@ant-design/plots';
import { Column } from '@ant-design/plots';
import { Button } from 'antd/lib/radio';
import { Table } from '../../components';
import { getAllInterview } from '../../services/dashboardServices';
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
  const { TabPane } = Tabs;
  const [key, setKey] = useState(1);
  const dateFormatList = 'DD/MM/YYYY';
  const [param, setParam] = useState({
    limit: 3,
    page: 1,
  });

  useEffect(() => {
    loadDataDashboard(param);
  }, [param]);

  // useEffect(() => {
  //   const newDate = new Date();
  //   if (key === 1) {
  //     dataInterview.filter((data) => data.feedback.rate > 0);
  //   }
  // }, [key]);

  const loadDataDashboard = (param) => {
    getAllInterview(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataInterview(res.data.results);
      console.log(dataInterview);
    });
  };

  function callback(key) {
    setKey(key);
  }
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  const { Option } = Select;

  const dataa = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const configg = {
    appendPadding: 10,
    data: dataa,
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
        content: 'Ngu Lon',
      },
    },
  };

  const data3 = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  const config3 = {
    data: data3,
    width: 200,
    height: 300,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
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
            Content of Tab Upcoming
          </TabPane>
          <TabPane tab="Completed" key="3">
            Content of Tab Completed
          </TabPane>
        </Tabs>
      </div>
      <div className="dashBoard-center">
        <div className="dashBoard-center-chartJob">
          <Pie {...configg} />
        </div>
        <div className="dashBoard-center-chartJob2">
          <Column {...config3} />
        </div>
      </div>
      <div className="dashBoard-center">
        <div className="dashBoard-center-chartJob">
          <Pie {...config} />
        </div>
        <div className="dashBoard-center-chartJob2">
          <Pie {...configg} />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
