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
import moment from 'moment';

function Interview(props) {
  const [visible, setVisible] = useState(false);
  const [interviewerId, setInterviewerId] = useState();
  const [interviews, setInterviews] = useState();
  const [totalResults, setTotalResults] = useState();
  const [loading, setLoading] = useState(false);
  const { cadidate } = props;

  const onClose = () => {
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

  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
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
                  <p className="date-left-interview mb-0">
                    {moment(item.interviewDate).format('DD-MM-YYYY').toString()}
                  </p>
                  <p className="date-left-interview">
                    {`(${day.find(
                      (element, index) =>
                        moment(item.interviewDate).day() === index
                    )})`}
                  </p>
                  <p className="time-left-interview">
                    {moment(item.interviewDate).format('HH:mm').toString()} -{' '}
                    {item.duration < 60
                      ? `(${item.duration}Mins)`
                      : item.duration % 60 !== 0
                      ? `(${Math.floor(item.duration / 60)}Hr${
                          item.duration % 60
                        }Mins)`
                      : `(${item.duration / 60}Hr)`}
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
        setInterviews={setInterviews}
        setTotalResults={setTotalResults}
        setLoading={setLoading}
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
});

export default connect(mapStateToProps)(Interview);
