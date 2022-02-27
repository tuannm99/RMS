import React, { useEffect, useState } from 'react';
import jobService from '../../services/jobService';
import PublicPage from '../../components/publicHomePage';
import { Select } from 'antd';
import { Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import './gird.css';
import './style.css';

function Home(props) {
  const { Option } = Select;
  const { Search } = Input;
  const [dataJob, setdataJob] = useState([]);

  const [params, setParams] = useState({
    search: '',
  });
  const onSearch = (value) => {
    setParams({ ...params, search: value });
  };

  useEffect(() => {
    loadDataJobs();
  }, []);

  const loadDataJobs = () => {
    jobService.getListJobs().then((res) => {
      setdataJob(res);
      console.log(res);
    });
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const handleData = (item) => {
    localStorage.setItem('job', JSON.stringify(item));
    console.log(localStorage);
  };

  return (
    <>
      <div className="public-header">
        <img
          src="https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_1280.jpg"
          alt=""
        />
      </div>
      <div className="public-sub">
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <h1>Open Positions</h1>
              <div className="public-filter">
                <div className="public-option">
                  <Select
                    defaultValue="Choose Department"
                    style={{ width: 240 }}
                    onChange={handleChange}
                  >
                    <Option value="Sales">Salessss</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
                <div className="public-option">
                  <Select
                    defaultValue="Choose Work Type"
                    style={{ width: 240 }}
                    onChange={handleChange}
                  >
                    <Option value="Full time">Full time</Option>
                    <Option value="Pass time">Pass time</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
                <div className="public-Search">
                  <Search
                    placeholder="search by job name"
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 300 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className="public-title-job">
              <h1>finance</h1>
              <div className="public-role">3 Open roles</div>
            </div>
            <div className="pulic-item">
              {dataJob.map((item) => {
                if (item.typeJob === 'finance') {
                  return (
                    <div key={item.id}>
                      <Link
                        to={`/PublicJob/${item.id}`}
                        style={{ textDecoration: 'none' }}
                        onClick={() => handleData(item)}
                      >
                        <PublicPage
                          data={item}
                          classTitleJob="public-title-job"
                          classRoles="public-role"
                          classContent="public-content"
                          title="public-title"
                          classDes="public-des"
                          classAddress="public-address"
                          classTypeTime="public-type"
                        />
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className="public-title-job">
              <h1>Sales</h1>
              <div className="public-role">2 Open roles</div>
            </div>
            <div className="pulic-item">
              {dataJob.map((item) => {
                if (item.typeJob === 'sales') {
                  return (
                    <div key={item.id}>
                      <PublicPage
                        data={item}
                        classTitleJob="public-title-job"
                        classRoles="public-role"
                        classContent="public-content"
                        title="public-title"
                        classDes="public-des"
                        classAddress="public-address"
                        classTypeTime="public-type"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
