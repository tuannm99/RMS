import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

=======
>>>>>>> 6f6f96d24360db3ecdf1943da5798ebb7de85bac
function DetailPublic(props) {
  const { data } = props;
  return (
    <>
      <div className={props.detailHeader}>
        <div className={props.HeaderContent}>
          <div className={props.detailHeaderLeft}>
            <Link to={`/recruit`}>
              <ArrowLeftOutlined style={{ fontSize: '20px' }} />
            </Link>
            <h3>{data.typeJob}</h3>
            <h1>{data.title}</h1>
            <div className={props.detailHeaderSub}>
              <span>{data.address}</span> | <span>{data.typeTime}</span>
            </div>
          </div>
          <div className={props.detailHeaderRight}>
            <button>Apply Now</button>
          </div>
        </div>
      </div>
      <div className={props.detailPublicContent}>
        <span>{data.description}</span>
        <div className={props.detailContentList}>
          <h3>You Will</h3>
          <ul>
            <li>
              Plan, develop business opportunities at your assigned accounts.
            </li>
            <li>
              Initiate sales process by collecting and understanding account
              requirements.
            </li>
            <li>
              Build rapport with potential accounts, clearly presenting our
              value proposition and capabilities; overcome objections and
              negotiate to the company’s best interest.
            </li>
            <li>
              Grow accounts by both introducing them to new products/ services
              and by expanding existing product/service offered.
            </li>
          </ul>
          <h3>You Will Have</h3>
          <ul>
            <li>
              7+ years of relevant work experience in business development and
              account management.
            </li>
            <li>
              Plan, develop business opportunities at your assigned accounts.
            </li>
            <li>
              Experience working with executive level business and marketing
              leaders within client organization.
            </li>
            <li>Passion to learn and solve complex customer requirement.</li>
          </ul>
          <h5>Think you are an ideal candidate!!! Apply Now.</h5>
        </div>
      </div>
    </>
  );
}

export default DetailPublic;
