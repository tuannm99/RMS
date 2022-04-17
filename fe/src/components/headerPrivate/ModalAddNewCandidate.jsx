import { Button, Col, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllJobs } from '../../services/jobService';
import { hasResponseError } from '../../utils/utils';
import { toast } from 'react-toastify';
import { selectJobId } from '../../redux/stores/job/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as action from '../../redux/stores/job/actions';
import { useNavigate } from 'react-router-dom';
import { setVisibleAddCandi } from '../../redux/stores/cadidate/actions';

const { Option } = Select;
function ModalAddNewCandidate(props) {
  const { isModalVisible, handleOk, handleCancel, setVisibleAddCandi } = props;
  const [recruit, setRecruit] = useState();
  const [job, setJob] = useState(null);
  const { setJobId } = props;
  const navigation = useNavigate();

  useEffect(() => {
    getAllJobs().then((res) => {
      if (hasResponseError(res)) {
        return;
      }
      setRecruit(res.data.results);
    });
  }, []);

  const onChange = (value) => {
    setJob(value);
  };

  const handleAddCandi = async () => {
    if (job) {
      await setJobId(job);
      handleCancel();
      navigation('/candidate');
      setVisibleAddCandi(true);
    } else {
      toast.error('Please choose job!');
      return;
    }
  };

  return (
    <Modal
      title="CHOOSE JOB"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <Col span={24}>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Choose the job you want apply..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={onChange}
          >
            {recruit &&
              recruit.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.title}
                </Option>
              ))}
          </Select>
        </Col>
        <Col span={24} className="mt-32">
          <Button
            type="primary"
            style={{ width: '100%', textAlign: 'center' }}
            onClick={handleAddCandi}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

const mapStateToProps = createStructuredSelector({
  jobId: selectJobId,
});
const mapDispatchToProps = (dispatch) => ({
  setJobId: (payload) => dispatch(action.setJobId(payload)),
  setVisibleAddCandi: (payload) => dispatch(setVisibleAddCandi(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ModalAddNewCandidate);
