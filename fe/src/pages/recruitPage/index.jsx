import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../../services/jobService';
import Recruit from '../../components/recruit';
import './style.css';
import { hasResponseError } from '../../utils/utils';

import { toast } from 'react-toastify';
import { createJobs } from '../../services/jobService';
import { Row, Col, Button, Breadcrumb, Select, Pagination } from 'antd';
import JobAdd from './component/jobAdd';
import Column from 'antd/lib/table/Column';

function RecruitPage(props) {
  const [dataJobs, setDataJobs] = useState();
  const [visible, setVisible] = useState(false);
  const { Option } = Select;
  const [param, setParam] = useState({
    limit: 10,
    page: 1,
  });

  function handleChange(value) {
    if (value === 'allJob') {
      const obj = { ...param };
      delete obj['status'];
      setParam(obj);
    } else {
      setParam({
        ...param,
        status: value,
      });
    }
  }

  useEffect(() => {
    loadDataJobs(param);
  }, [param]);

  const loadDataJobs = (param) => {
    getAllJobs(param).then((res) => {
      if (hasResponseError(res)) {
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      }
      setDataJobs(res.data);
      console.log(res);
    });
  };

  const colStyles = {
    flexBasis: '20%',
    width: '20%',
  };

  const handleChangeData = (pagination) => {
    console.log(pagination);
    setParam({ ...param, page: pagination });
    loadDataJobs({ ...param, page: pagination });
  };

  const onclose = () => {
    setVisible(false);
  };

  const showDrawp = () => {
    setVisible(true);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 16 }} xl={{ span: 16 }} xxl={{ span: 20 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Recruitment</Breadcrumb.Item>
            <Breadcrumb.Item>Recruit</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col md={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 2 }}>
          <Button className="Recruit-button fr" onClick={showDrawp}>
            Add Job Posting
          </Button>
        </Col>
        <Col md={{ span: 4 }} xl={{ span: 4 }} xxl={{ span: 2 }}>
          {dataJobs && (
            <Pagination
              pageSize={dataJobs?.limit}
              current={dataJobs?.page}
              total={dataJobs?.totalResults}
              onChange={handleChangeData}
              className="fr"
            />
          )}
        </Col>
        <Col span={24}>
          <Select
            defaultValue="allJob"
            style={{ width: 120 }}
            onSelect={handleChange}
            className="recruit-selector"
          >
            <Option value="allJob">All Job</Option>
            <Option value="published">Published</Option>
            <Option value="onHold">Hode On</Option>
            <Option value="deleted">deleted</Option>
          </Select>
        </Col>
      </Row>

      <Row type="flex" gutter={30}>
        {dataJobs &&
          dataJobs?.results?.map((item) => {
            return (
              <Col
                className="recuid-card"
                key={item.id}
                style={{ ...colStyles }}
              >
                <Recruit
                  data={item}
                  jobId={item.id}
                  cardJD="card-jd"
                  cartHeader="cart-header"
                  cartTitle="cart-title"
                  cartContent="cart-content"
                  cartLocal="cart-local"
                  cartIcon="cart-icon"
                  cartFooter="cart-footer"
                />
              </Col>
            );
          })}
      </Row>
      <JobAdd
        visible={visible}
        onclose={onclose}
        job={dataJobs}
        loadData={loadDataJobs}
      />
    </>
  );
}

export default RecruitPage;
