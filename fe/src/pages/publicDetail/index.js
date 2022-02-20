import React from "react";

import DetailPublic from "../../components/publicDetail";
import "./style.css";

function HomeDetail(props) {
  const loggedInJob = JSON.parse(localStorage.getItem("job"));

  return (
    <>
      <DetailPublic
        data={loggedInJob}
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
