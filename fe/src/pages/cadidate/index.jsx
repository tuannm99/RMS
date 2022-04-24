import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Pagination, Radio, Button, Input, Spin } from 'antd';

import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { selectJobId } from '../../redux/stores/job/selectors';
import { setJobId } from '../../redux/stores/job/actions';
import { cadidates, loading } from '../../redux/stores/cadidate/selectors';
import {
  getAllCadidates,
  setId,
  setVisibleAddCandi,
} from '../../redux/stores/cadidate/actions';
import * as services from '../../services/cadidateServices';
import { getAllJobs } from '../../services/jobService';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { hasResponseError } from '../../utils/utils';
import { Table } from '../../components';
import { toast } from 'react-toastify';
import AddCadidate from './components/add_cadidate';
import CadidateInfo from './components/info_cadidate';
import {
  renderBodyTable,
  customerTableHead,
  renderHeadTable,
} from './components/render';
import EditAddInterview from './components/info_cadidate/EditAddInterview';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Search } = Input;

function CadidatePage(props) {
  const [radio, setRadio] = useState(':asc');
  const [sortSlect, setSortSlect] = useState('createdAt');
  const [visibleInfoCadi, setVisibleInfoCadi] = useState(false);
  const [jobs, setjobs] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const payload = {
    limit: 10,
    page: 1,
    sortBy: '',
    fullName: '',
  };

  const [params, setParams] = useState(payload);

  const { getAllCadidates, setCadidateId, setJobId, setVisibleAddCandi } =
    props;
  const { jobId, userAccount } = props;
  const { loading, cadidates } = props;

  useEffect(() => {
    if (jobId === '') {
      getAllCadidates(params);
    } else {
      getAllCadidates({ ...params, jobId: jobId });
    }
  }, [jobId, params, getAllCadidates]);

  useEffect(() => {
    getAllJobs().then((res) => {
      setjobs(res.data.results);
    });
    return () => {
      setjobs([]);
    };
  }, []);

  const onCloseAddCadi = () => {
    setVisibleAddCandi(false);
  };

  const onCloseInfoCadi = () => {
    getAllCadidates(params);
    setVisibleInfoCadi(false);
  };

  const handleDelete = async (id) => {
    const res = await services.deleteCadidateServices(id);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    toast.success('Delete success!');

    if (
      cadidates?.totalResults > 9 &&
      cadidates?.totalResults % params.limit === 1
    ) {
      setParams({ ...params, page: cadidates?.page - 1 });
    } else {
      setParams({ ...params });
    }
  };
  /**
   * change page size
   * @param {*} pagination
   */
  const handleChangeData = (pagination) => {
    setParams({ ...params, page: pagination });
  };

  /**
   * change select sort
   * @param {*} value
   */
  const handleSelectSort = (value) => {
    setSortSlect(value);
    setParams({ ...params, sortBy: `${value}${radio}` });
  };

  const handleSelctJob = (value) => {
    setJobId(value);
    if (value === '') {
      delete params.jobId;
      setParams({ ...params });
    } else {
      setParams({ ...params, jobId: value });
    }
  };

  const handleSelectStatus = (value) => {
    console.log(value);
    if (value === '') {
      delete params.status;
      setParams({ ...params });
    } else {
      setParams({ ...params, status: value });
    }
  };

  /**
   * change radio sort allow asc and desc
   * @param {*} e
   */
  const onChangeRadio = (e) => {
    setRadio(e.target.value);
    setParams({ ...params, sortBy: `${sortSlect}${e.target.value}` });
  };

  const onSearch = (value) => {
    setParams({ ...params, fullName: value });
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row className="employee_tool" wrap={true}>
        <Col flex={1} className="mt-12">
          <strong>Jobs: </strong>
          <Select
            value={jobId}
            style={{ width: 125 }}
            onSelect={handleSelctJob}
            showArrow={true}
          >
            <Option value="">All</Option>
            {jobs.map((item) => (
              <Option value={item.id} key={item.id}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Col>
        <Col flex={3} style={{ textAlign: 'center' }} className="mt-12">
          <Search
            style={{ maxWidth: 400, textAlign: 'center' }}
            placeholder="Cadidate Name Search"
            onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col flex={1} className="fr mt-12">
          <Pagination
            current={cadidates?.page}
            total={cadidates?.totalResults}
            pageSize={params?.limit}
            onChange={handleChangeData}
            className="fr"
          />
        </Col>
      </Row>

      <Row>
        <Col
          lg={jobId !== '' ? { span: 8 } : { span: 0 }}
          xs={{ span: 24 }}
          className="mt-12"
        >
          {jobId !== '' && (
            <Button onClick={() => setVisibleAddCandi(true)}>
              Add Candidate
            </Button>
          )}
        </Col>
        <Col
          lg={jobId !== '' ? { span: 8 } : { span: 16 }}
          xs={{ span: 12 }}
          className="mt-12"
        >
          <div>
            <strong>Status: </strong>
            <Select
              defaultValue=""
              style={{ width: 125 }}
              onSelect={handleSelectStatus}
              showArrow={true}
            >
              <Option value="">All</Option>
              <Option value="open">Open</Option>
              <Option value="approve">Approve</Option>
              <Option value="reject">Reject</Option>
            </Select>
          </div>
        </Col>
        <Col lg={{ span: 7 }} xs={{ span: 10 }} className="mt-12">
          <div className="fr mr-8">
            <strong>Sort by: </strong>
            <Select
              defaultValue="createdAt"
              style={{ width: 125 }}
              onSelect={handleSelectSort}
              showArrow={true}
            >
              <Option value="createdAt">All</Option>
              <Option value="fullName">Name</Option>
              <Option value="updatedAt">Update At</Option>
              <Option value="email">Email</Option>
              <Option value="stage">Stage</Option>
            </Select>
          </div>
        </Col>
        <Col lg={{ span: 1 }} xs={{ span: 2 }} className="radio-sort">
          <Radio.Group onChange={onChangeRadio} value={radio}>
            <Radio value=":asc">Asc</Radio>
            <br />
            <Radio value=":desc">Desc</Radio>
          </Radio.Group>
        </Col>
      </Row>

      <div className="employee_content mt-16">
        {loading ? (
          <Col style={{ textAlign: 'center' }} span={24}>
            <Spin tip="loading..." />
          </Col>
        ) : (
          <Table
            headData={customerTableHead}
            renderHead={(item, index) => renderHeadTable(item, index)}
            bodyData={cadidates?.results}
            renderBody={(item, index) =>
              renderBodyTable(
                item,
                index,
                handleDelete,
                setVisibleInfoCadi,
                setCadidateId,
                setVisible,
                userAccount,
                navigate
              )
            }
          />
        )}
      </div>
      <AddCadidate
        onclose={onCloseAddCadi}
        params={params}
        setParams={setParams}
      />
      <CadidateInfo
        visible={visibleInfoCadi}
        onclose={onCloseInfoCadi}
        params={params}
      />
      <EditAddInterview visible={visible} onclose={onClose} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  userAccount: selectUserInfor,
  jobId: selectJobId,
  loading: loading,
  cadidates: cadidates,
});
const mapDispatchToProps = (dispatch) => ({
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
  setCadidateId: (payload) => dispatch(setId(payload)),
  setJobId: (payload) => dispatch(setJobId(payload)),
  setVisibleAddCandi: (payload) => dispatch(setVisibleAddCandi(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CadidatePage);
