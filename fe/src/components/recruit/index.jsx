import React from 'react';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';

function Recruit(props) {
  const { data } = props;

  return (
    <>
      <div className={props.cardJD}>
        <div className={props.cartHeader}>
          <div className={props.cartTitle}>
            <h5>{data.department}</h5>
          </div>
          <h4>{data.title}</h4>
        </div>
        <div className={props.cartContent}>
          <Progress
            type="circle"
            percent={100}
            format={() => `${data.totalCandidate}`}
            width={120}
            strokeWidth={3}
            strokeColor={'#9e80c5'}
            trailColor={'#607787'}
            status="normal"
          />
          <div className={props.cartLocal}>
            <UserOutlined className={props.cartIcon} />
            <h3>{data.location} | </h3> <h3>{data.jobType}</h3>
          </div>
        </div>
        <div className={props.cartFooter}>
          <GlobalOutlined className={'cart-icon cart-global'} />
          <h3>Published</h3>
          <Link to={`/recruit/${data.id}`} style={{ textDecoration: 'none' }}>
            <button>Detail </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Recruit;
