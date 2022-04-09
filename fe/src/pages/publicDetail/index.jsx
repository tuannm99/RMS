import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';
import { getPublishJobDetail } from '../../services/careerServices';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AddCadidate from '../cadidate/components/add_cadidate';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  setVisibleAddCandi,
  setCheckToken,
} from '../../redux/stores/cadidate/actions';
import { setJobId } from '../../redux/stores/job/actions';

function HomeDetail(props) {
  const [job, setJob] = useState({});
  let { id } = useParams();

  const { setVisibleAddCandi, setJobId, setCheckToken } = props;

  useEffect(() => {
    fetchJob();
    return () => {
      setJob({});
    };
  }, []);

  const fetchJob = async () => {
    const jobDetail = await getPublishJobDetail(id);
    setJob(jobDetail.data);
  };

  const handleAddCandidate = async () => {
    await setJobId(id);
    setCheckToken(false);
    setVisibleAddCandi(true);
  };
  const onCloseAddCadi = async () => {
    setCheckToken(true);
    setVisibleAddCandi(false);
  };
  return (
    <>
      <div className="detail-public-header">
        <div className="detail-public-header-content">
          <div className="detail-public-header-left">
            <Link to={`/PublicJob`}>
              <ArrowLeftOutlined style={{ fontSize: '20px' }} />
            </Link>
            <h3>{job.department}</h3>
            <h1>{job.title}</h1>
            <div className="detail-public-header-sub">
              <span>{job.location}</span> | <span>{job.jobType}</span>
            </div>
          </div>
          <div className="detail-public-header-right">
            <button onClick={handleAddCandidate}>Apply Now</button>
          </div>
        </div>
      </div>
      <div className="detail-public-content">
        <span>{job.description}</span>
        <div className="detail-public-content-list">
          <span dangerouslySetInnerHTML={{ __html: job.jobDescription }}></span>
        </div>
      </div>
      <AddCadidate onclose={onCloseAddCadi} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = (dispatch) => ({
  setVisibleAddCandi: (payload) => dispatch(setVisibleAddCandi(payload)),
  setJobId: (payload) => dispatch(setJobId(payload)),
  setCheckToken: (payload) => dispatch(setCheckToken(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeDetail);
