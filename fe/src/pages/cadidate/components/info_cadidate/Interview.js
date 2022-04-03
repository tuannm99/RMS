import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty, Col, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import EditAddInterview from './EditAddInterview';

function Interview(props) {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

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
            onClick={() => setVisible(true)}
          >
            Schedule Interview
          </Button>
        </Col>
        {/* <Col span={24} style={styles}>
          <Empty description={false} />,
        </Col> */}
        <Col span={24}>
          <div className="content-interview">
            <div className="left-interview">
              <p className="date-left-interview">Feb 20, 2022 (Sunday)</p>
              <p className="time-left-interview">5:00 PM to 6:00 PM - (1 Hr)</p>
            </div>
            <div className="right-inteview">
              <p className="name-right-inteview">Van Ngo</p>
              <p className="stage-right-inteview">Written test</p>
              <p className="sche-right-inteview">
                Scheduled by <span>Tuan Nguyen</span>
              </p>
            </div>
            <div className="interview-icon">
              <Tooltip placement="bottomRight" title="Edit interview">
                <EditOutlined className="mr-8 cu" />
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete interview">
                <DeleteOutlined className="cu" />
              </Tooltip>
            </div>
            <Button className="feedback">Add feedback</Button>
          </div>
          <div className="content-interview">
            <div className="left-interview">
              <p className="date-left-interview">Feb 20, 2022 (Sunday)</p>
              <p className="time-left-interview">5:00 PM to 6:00 PM - (1 Hr)</p>
            </div>
            <div className="right-inteview">
              <p className="name-right-inteview">Van Ngo</p>
              <p className="stage-right-inteview">Written test</p>
              <p className="sche-right-inteview">
                Scheduled by <span>Tuan Nguyen</span>
              </p>
            </div>
            <div className="interview-icon">
              <Tooltip placement="bottomRight" title="Edit interview">
                <EditOutlined className="mr-8 cu" />
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete interview">
                <DeleteOutlined className="cu" />
              </Tooltip>
            </div>
            <Button className="feedback">Add feedback</Button>
          </div>
          <div className="content-interview">
            <div className="left-interview">
              <p className="date-left-interview">Feb 20, 2022 (Sunday)</p>
              <p className="time-left-interview">5:00 PM to 6:00 PM - (1 Hr)</p>
            </div>
            <div className="right-inteview">
              <p className="name-right-inteview">Van Ngo</p>
              <p className="stage-right-inteview">Written test</p>
              <p className="sche-right-inteview">
                Scheduled by <span>Tuan Nguyen</span>
              </p>
            </div>
            <div className="interview-icon">
              <Tooltip placement="bottomRight" title="Edit interview">
                <EditOutlined className="mr-8 cu" />
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete interview">
                <DeleteOutlined className="cu" />
              </Tooltip>
            </div>
            <Button className="feedback">Add feedback</Button>
          </div>
          <div className="content-interview">
            <div className="left-interview">
              <p className="date-left-interview">Feb 20, 2022 (Sunday)</p>
              <p className="time-left-interview">5:00 PM to 6:00 PM - (1 Hr)</p>
            </div>
            <div className="right-inteview">
              <p className="name-right-inteview">Van Ngo</p>
              <p className="stage-right-inteview">Written test</p>
              <p className="sche-right-inteview">
                Scheduled by <span>Tuan Nguyen</span>
              </p>
            </div>
            <div className="interview-icon">
              <Tooltip placement="bottomRight" title="Edit interview">
                <EditOutlined className="mr-8 cu" />
              </Tooltip>
              <Tooltip placement="bottomRight" title="Delete interview">
                <DeleteOutlined className="cu" />
              </Tooltip>
            </div>
            <Button className="feedback">Add feedback</Button>
          </div>
        </Col>
      </Row>
      <EditAddInterview visible={visible} onclose={onClose} />
    </>
  );
}

export default Interview;
