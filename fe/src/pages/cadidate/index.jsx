import React, { useEffect, useState } from 'react';
import { Col, Row, Select, Pagination, Radio, Button, Input, Spin } from 'antd';

import { selectUserInfor } from '../../redux/stores/auth/selectors';
import { selectJobId } from '../../redux/stores/job/selectors';
import { cadidates, loading } from '../../redux/stores/cadidate/selectors';
import { getAllCadidates, setId } from '../../redux/stores/cadidate/actions';
import * as services from '../../services/cadidateServices';
import { getAllJobs } from '../../services/jobService';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { hasResponseError } from '../../utils/utils';

import { Table } from '../../components';

import { toast } from 'react-toastify';
import Add_Cadidate from './components/add_cadidate';
import Cadidate_Info from './components/info_cadidate';

import {
  renderBodyTable,
  customerTableHead,
  renderHeadTable,
} from './components/render';

const { Option } = Select;
const { Search } = Input;

function CadidatePage(props) {
  const [radio, setRadio] = useState(':asc');
  const [sortSlect, setSortSlect] = useState('createdAt');
  const [visibleAddCadi, setVisibleAddCadi] = useState(false);
  const [visibleInfoCadi, setVisibleInfoCadi] = useState(false);
  const [jobs, setjobs] = useState([]);

  const payload = {
    limit: 10,
    page: 1,
    sortBy: '',
    fullName: '',
  };

  const [params, setParams] = useState(payload);

  const { getAllCadidates, setCadidateId } = props;
  const { jobId, userAccount } = props;
  const { loading, cadidates } = props;

  useEffect(() => {
    getAllCadidates(params);
  }, [params, getAllCadidates]);

  useEffect(() => {
    getAllJobs().then((res) => {
      setjobs(res.data.results);
    });
    return () => {
      setjobs([]);
    };
  }, []);

  console.log(cadidates);
  const onCloseAddCadi = () => {
    setVisibleAddCadi(false);
  };

  const onCloseInfoCadi = () => {
    setVisibleInfoCadi(false);
  };

  const handleDelete = async (id) => {
    const res = await services.deleteCadidateServices(id);
    if (hasResponseError(res)) {
      toast.error(`${res.data.message}`);
      return;
    }
    toast.success('Delete success!');
    const res1 = await services.getAllCadidatesServices();
    if (hasResponseError(res1)) {
      toast.error(`${res.data.message}`);
      return;
    }
    if (res1.data.totalResults % params.limit === 0) {
      setParams({ ...params, page: params.page - 1 });
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
    if (value === '') {
      delete params.jobId;
      setParams({ ...params });
    } else {
      setParams({ ...params, jobId: value });
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

  return (
    <>
      <Row className="employee_tool" wrap={true}>
        <Col flex={1} className="mt-12">
          <strong>Jobs: </strong>
          <Select
            defaultValue=""
            style={{ width: 125 }}
            onSelect={handleSelctJob}
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
        <Col span={12} className="mt-12">
          {(userAccount?.role === 'admin' ||
            userAccount?.role === 'hiringManager') &&
            jobId !== '' && (
              <Button onClick={() => setVisibleAddCadi(true)}>
                Add Cadidate
              </Button>
            )}
        </Col>
        <Col span={11} className="mt-12">
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
        <Col span={1} className="radio-sort">
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
                setCadidateId
              )
            }
          />
        )}
      </div>
      <Add_Cadidate
        visible={visibleAddCadi}
        onclose={onCloseAddCadi}
        params={params}
      />
      <Cadidate_Info visible={visibleInfoCadi} onclose={onCloseInfoCadi} />
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
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CadidatePage);
