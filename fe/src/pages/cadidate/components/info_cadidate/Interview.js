import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty, Col, Row, Tooltip, Spin, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteInterviewsServices } from '../../../../services/cadidateServices';
import EditAddInterview from './EditAddInterview';
import {
  cadidate,
  interviews,
  loadingInterviews,
  loadingCadidate,
} from '../../../../redux/stores/cadidate/selectors';
import { getAllInterviews } from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import moment from 'moment';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import UpdateFeedBack from './UpdateFeedBack';
import {
  interviewerId,
  idInterviewer,
  dateInterview,
  nameInterviewer,
} from '../../../../redux/stores/interview/selectors';
import {
  setDateInterview,
  setIdIntervier,
  setInterviewerId,
  setNameInterviewer,
} from '../../../../redux/stores/interview/actions';

function Interview(props) {
  const [visible, setVisible] = useState(false);
  const [interviewer, setInterviewer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    cadidate,
    getAllInterviews,
    interviews,
    loadingInterviews,
    account,
    loadingCadidate,
    interviewerId,
    idInterviewer,
    dateInterview,
    nameInterviewer,
    setDateInterview,
    setIdIntervier,
    setInterviewerId,
    setNameInterviewer,
  } = props;

  useEffect(() => {
    getAllInterviews(cadidate?.id);
  }, [cadidate, getAllInterviews]);

  const showModal = (item) => {
    setIsModalVisible(true);
    setInterviewer(item);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIdIntervier(null);
    setNameInterviewer(null);
    setDateInterview(null);
    setInterviewerId(null);
    setVisible(false);
  };

  const handleDeleteInterview = async (id) => {
    const res = await deleteInterviewsServices(cadidate?.id, id);
    if (hasResponseError(res)) {
      toast.error(res.data.message);
      return;
    }
    toast.success('Delete interview success!');
    getAllInterviews(cadidate?.id);
  };

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
        {account?.role === 'hiringManager' && (
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
        )}
        {(interviews === undefined ||
          (interviews?.length === 0 &&
            !loadingInterviews &&
            !loadingCadidate)) && (
          <Col span={24} style={styles}>
            <Empty description={false} />,
          </Col>
        )}
        <Col span={24}>
          {!loadingInterviews &&
            interviews?.map((item) => (
              <div className="content-interview" key={item?.id}>
                <div className="left-interview">
                  <p className="date-left-interview mb-0">
                    {moment(item?.interviewDate)
                      .format('DD-MM-YYYY')
                      .toString()}
                  </p>
                  <p className="date-left-interview">
                    {`(${day.find(
                      (element, index) =>
                        moment(item?.interviewDate).day() === index
                    )})`}
                  </p>
                  <p className="time-left-interview">
                    {moment(item?.interviewDate).format('HH:mm').toString()} -{' '}
                    {item?.duration < 60
                      ? `(${item?.duration}Mins)`
                      : item?.duration % 60 !== 0
                      ? `(${Math.floor(item?.duration / 60)}Hr${
                          item?.duration % 60
                        }Mins)`
                      : `(${item?.duration / 60}Hr)`}
                  </p>
                </div>
                <div className="right-inteview">
                  <p className="name-right-inteview">
                    Interviewer: <span>{item?.interviewer?.fullName}</span>
                  </p>
                  <p className="stage-right-inteview">{item?.stage} round</p>
                  <p className="sche-right-inteview">
                    Schedule By: <span>{item?.scheduleBy?.fullName}</span>
                  </p>
                </div>
                {account?.role === 'hiringManager' && (
                  <>
                    <div className="interview-icon">
                      <Tooltip placement="bottomRight" title="Edit interview">
                        <EditOutlined
                          className="mr-8 cu"
                          onClick={() => {
                            setVisible(true);
                            setInterviewerId(item?.id);
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="bottomRight" title="Delete interview">
                        <Popconfirm
                          onConfirm={() => handleDeleteInterview(item?.id)}
                          title="Are you sure delete???"
                        >
                          <DeleteOutlined className="cu" />
                        </Popconfirm>
                      </Tooltip>
                    </div>
                  </>
                )}

                <Button
                  className="feedback"
                  onClick={() => showModal(item)}
                  disabled={
                    account?.role === 'hiringManager' ||
                    account?.id === item?.interviewer?.id
                      ? false
                      : true
                  }
                >
                  feedback
                </Button>
              </div>
            ))}
        </Col>
        {loadingInterviews && (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Spin />
          </Col>
        )}
      </Row>
      <EditAddInterview visible={visible} onclose={onClose} />
      <UpdateFeedBack
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        interviewer={interviewer}
      />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  interviews: interviews,
  loadingInterviews: loadingInterviews,
  loadingCadidate: loadingCadidate,
  account: selectUserInfor,
  interviewerId: interviewerId,
  idInterviewer: idInterviewer,
  dateInterview: dateInterview,
  nameInterviewer: nameInterviewer,
});
const mapDispatchToProps = (dispatch) => ({
  getAllInterviews: (payload) => dispatch(getAllInterviews(payload)),
  setDateInterview: (payload) => dispatch(setDateInterview(payload)),
  setIdIntervier: (payload) => dispatch(setIdIntervier(payload)),
  setInterviewerId: (payload) => dispatch(setInterviewerId(payload)),
  setNameInterviewer: (payload) => dispatch(setNameInterviewer(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Interview);
