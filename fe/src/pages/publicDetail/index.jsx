import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import DetailPublic from '../../components/publicDetail';
import './style.css';
import { getPublishJobDetail } from '../../services/careerServices';

function HomeDetail(props) {
  const [job, setJob] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    const jobDetail = await getPublishJobDetail(id);
    setJob(jobDetail.data);
    console.log(job);
  };

  return (
    <>
      <DetailPublic
        data={job}
        detailHeader="detail-public-header"
        HeaderContent="detail-public-header-content"
        detailHeaderLeft="detail-public-header-left"
        detailHeaderSub="detail-public-header-sub"
        detailHeaderRight="detail-public-header-right"
        detailPublicContent="detail-public-content"
        detailContentList="detail-public-content-list"
      />
    </>
  );
}

export default HomeDetail;
