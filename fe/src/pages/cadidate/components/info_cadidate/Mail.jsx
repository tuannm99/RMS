import React from 'react';
import { Form, Col, Row, Input, Button } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Mail() {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="firstName" label="To">
            <Input placeholder="Enter to" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="midName" label="Title">
            <Input placeholder="Enter title" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="des" label="Title">
            <CKEditor
              type="string"
              editor={ClassicEditor}
              data={`hello`}
              onChange={(event, editor) => {
                // const data = editor.getData();
                // setCkeditorData(data);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-submit"
            style={{
              width: '100%',
              height: 30,
            }}
          >
            Send Mail
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Mail;
