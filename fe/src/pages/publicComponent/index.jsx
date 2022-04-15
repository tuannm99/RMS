import React, { useEffect, useState } from 'react';
import { getAllPublishJob } from '../../services/careerServices';
import PublicPage from '../../components/publicHomePage';
import { Select } from 'antd';
import { Input, Pagination, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
import { toast } from 'react-toastify';
import { hasResponseError } from '../../utils/utils';

function Home(props) {
  const { Option } = Select;
  const { Search } = Input;
  const [dataJob, setdataJob] = useState([]);
  const [dataPage, setDataPage] = useState();

  const [param, setParam] = useState({
    limit: 6,
    page: 1,
  });

  useEffect(() => {
    loadDataJobs(param);
  }, [param]);

  const onSearch = (value) => {
    if (value.trim() !== '') {
      setParam({ ...param, title: value });
    } else setParam({ ...param, title: null });
  };

  const loadDataJobs = (param) => {
    getAllPublishJob(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setdataJob(res.data.results);
    });

    getAllPublishJob(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataPage(res.data);
      console.log(dataPage);
    });
  };

  function handleChange(value) {
    if (value === 'All') {
      const obj = { ...param };
      delete obj['department'];
      setParam(obj);
    } else {
      setParam({
        ...param,
        department: value,
      });
    }
  }

  const handleChangeData = (pagination) => {
    setParam({ ...param, page: pagination });
    loadDataJobs({ ...param, page: pagination });
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
        <h1>Open Positions</h1>
        <div className="public-filter">
          <div className="public-option">
            <Select
              defaultValue="Choose Department"
              style={{ width: 240 }}
              onChange={handleChange}
            >
              <Option value="All">All</Option>
              <Option value="administration">Administrtion</Option>
              <Option value="finance">Finance</Option>
              <Option value="marketing">Maketing</Option>
              <Option value="sale">Sale</Option>
              <Option value="engineering">Engineering</Option>
              <Option value="humanResources">HumanResources</Option>
            </Select>
          </div>
          <div className="public-Search">
            <Search
              placeholder="search by job name"
              allowClear
              onSearch={onSearch}
              style={{ width: 300 }}
              enterButton
            />
          </div>
        </div>
      </div>
      {dataPage && (
        <Pagination
          pageSize={dataPage?.limit}
          current={dataPage?.page}
          total={dataPage?.totalResults}
          onChange={handleChangeData}
          className="fr career-Pagination"
        />
      )}
      <div className="container career-container">
        <Row gutter={20}>
          {dataJob.map((item) => {
            return (
              <Col
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
                key={item.id}
                className="mb-24"
              >
                <div>
                  <Link
                    to={`/PublicJob/${item.id}`}
                    style={{ textDecoration: 'none' }}
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
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default Home;
