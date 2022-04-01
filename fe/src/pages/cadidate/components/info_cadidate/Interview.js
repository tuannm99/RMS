import { Button, Empty, Col, Row } from 'antd';
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
        <Col span={24} style={styles}>
          <Empty description={false} />,
        </Col>
      </Row>
      <EditAddInterview visible={visible} onclose={onClose} />
    </>
  );
}

export default Interview;
