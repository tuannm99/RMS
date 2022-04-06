import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty, Col, Row, Tooltip, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllInterviewsServices } from '../../../../services/cadidateServices';
import EditAddInterview from './EditAddInterview';
import {
  cadidate_Id,
  cadidate,
} from '../../../../redux/stores/cadidate/selectors';
import {
  getCadidate,
  getAllCadidates,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
function Interview(props) {
  const [visible, setVisible] = useState(false);
  const [interviewerId, setInterviewerId] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cadidate } = props;

  const onClose = () => {
    setInterviews(null);
    setTotalResults(null);
    setVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllInterviewsServices(cadidate?.id).then((res) => {
      setInterviews(res.data.results);
      setTotalResults(res.data.totalResults);
      setLoading(false);
    });
  }, [cadidate]);

  const styles = {
    marginTop: '100px',
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            className="fr"
            onClick={() => {
              setVisible(true);
              setInterviewerId(null);
            }}
          >
            Schedule Interview
          </Button>
        </Col>
        {/* <Col span={24} style={styles}>
          <Empty description={false} />,
        </Col> */}
        <Col span={24}>
          {interviews &&
            !loading &&
            interviews.map((item) => (
              <div className="content-interview" key={item.id}>
                <div className="left-interview">
                  <p className="date-left-interview">Feb 20, 2022 (Sunday)</p>
                  <p className="time-left-interview">
                    5:00 PM to 6:00 PM - (1 Hr)
                  </p>
                </div>
                <div className="right-inteview">
                  <p className="name-right-inteview">
                    {item?.candidateId?.fullName}
                  </p>
                  <p className="stage-right-inteview">{item.stage}</p>
                  <p className="sche-right-inteview">
                    Interviewer: <span>{item.interviewer.fullName}</span>
                  </p>
                </div>
                <div className="interview-icon">
                  <Tooltip placement="bottomRight" title="Edit interview">
                    <EditOutlined
                      className="mr-8 cu"
                      onClick={() => {
                        setVisible(true);
                        setInterviewerId(item.id);
                      }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottomRight" title="Delete interview">
                    <DeleteOutlined className="cu" />
                  </Tooltip>
                </div>
                <Button className="feedback">Add feedback</Button>
              </div>
            ))}
        </Col>
        {loading && (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Spin />
          </Col>
        )}
      </Row>
      <EditAddInterview
        visible={visible}
        onclose={onClose}
        interviewerId={interviewerId}
        totalResults={totalResults}
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
});

export default connect(mapStateToProps)(Interview);
