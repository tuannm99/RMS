import React, { useEffect, useState } from 'react';
import DetailPublic from '../../components/publicDetail';
import { useParams } from 'react-router-dom';
import jobService from '../../services/jobService';

function DetailRecruitPage(props) {
  let { id } = useParams();
  const [dataJobID, setDataJobID] = useState({});

  useEffect(() => {
    jobService.getIdJobs(id).then((res) => setDataJobID(res));
  }, []);

  return (
    <>
      <DetailPublic
        data={dataJobID}
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

export default DetailRecruitPage;
