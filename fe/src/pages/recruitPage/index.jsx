import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../../services/jobService';
import './style.css';
import { hasResponseError } from '../../utils/utils';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { selectJobId } from '../../redux/stores/job/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as action from '../../redux/stores/job/actions';
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  Select,
  Pagination,
  Card,
  Progress,
  Divider,
} from 'antd';
import JobAdd from './component/jobAdd';

function RecruitPage(props) {
  const [dataJobs, setDataJobs] = useState();
  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  const [param, setParam] = useState({
    limit: 10,
    page: 1,
  });

  const { jobId } = props;
  const { setJobId } = props;

  const navigation = useNavigate();

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
    });
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

  const handleLinkCadidate = async (id) => {
    await setJobId(id);
    navigation('/cadidate');
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Breadcrumb>
            <Breadcrumb.Item>Recruitment</Breadcrumb.Item>
            <Breadcrumb.Item>Recruit</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={12}>
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
      </Row>
      <Divider className="mb-0 mt-12" />
      <Row className="mt-12">
        <Col span={12}>
          <Select
            defaultValue="allJob"
            style={{ width: 120 }}
            onSelect={handleChange}
            className="mb-12"
          >
            <Option value="allJob">All Job</Option>
            <Option value="published">Published</Option>
            <Option value="onHold">Hode On</Option>
            <Option value="deleted">deleted</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Button className="fr" onClick={showDrawp}>
            Add Job Posting
          </Button>
        </Col>
      </Row>

      <Row gutter={20}>
        {dataJobs &&
          dataJobs?.results?.map((item) => {
            return (
              <Col
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 3 }}
                key={item.id}
                className="mb-24"
              >
                <div className="card">
                  <Card
                    style={{
                      width: '100%',
                      minHeight: '350px',
                      textAlign: 'center',
                    }}
                    hoverable="true"
                    title={
                      <div onClick={() => handleLinkCadidate(item.id)}>
                        {item.department}
                      </div>
                    }
                    actions={[
                      <div>
                        <GlobalOutlined key="global" className="mr-8" />
                        {item.status}
                      </div>,
                      <Link to={`/recruit/${item.id}`}>
                        <div>Details</div>
                      </Link>,
                    ]}
                  >
                    <div
                      className="body-card"
                      onClick={() => handleLinkCadidate(item.id)}
                    >
                      <p className="title-card mb-16">{item.title}</p>
                      <Progress
                        type="circle"
                        percent={100}
                        format={() => `${item.candidateCount} candidates`}
                        width={120}
                        strokeWidth={4}
                        strokeColor={'#9e80c5'}
                        trailColor={'#607787'}
                        status="normal"
                      />
                      <div className="location mt-16">
                        {item.location && (
                          <span>
                            <UserOutlined /> {item.location} |{' '}
                          </span>
                        )}
                        {item.jobType && <span>{item.jobType}</span>}
                      </div>
                    </div>
                  </Card>
                </div>
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

const mapStateToProps = createStructuredSelector({
  jobId: selectJobId,
});
const mapDispatchToProps = (dispatch) => ({
  setJobId: (payload) => dispatch(action.setJobId(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RecruitPage);
