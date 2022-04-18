import React, { useState } from 'react';
import { Form, Col, Row, Input, Button, Popconfirm } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cadidate } from '../../../../redux/stores/cadidate/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { sendMailServices } from '../../../../services/cadidateServices';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import { QuestionCircleOutlined } from '@ant-design/icons';

function Mail(props) {
  const [form] = Form.useForm();

  const [ckeditorData, setCkeditorData] = useState(
    '<p>Chào bạn,</p><p>Mình là là …… - Chuyên viên nhân sự tại ….. .Cảm ơn Bạnđã quan tâm và ứng tuyển vào vị trí ….. . Theo quy trình tuyển dụng, mình mời bạn tham gia …… và trao đổi chi tiết về công việc theo thông tin sau:</p><p><strong>- Thời gian BẮT ĐẦU …..:</strong> …….<br><strong>- Địa điểm:</strong> …..</p><ul><li><strong>Nội dung …… :</strong> …….</li><li><strong>Thời lượng:</strong> …….</li><li><strong>Ngôn ngữ ……:</strong> ………</li></ul><p>Bạn vui lòng reply email của mình để confirm việc tham dự ……. của mình và lưu ý tham đúng giờ nhé.Để cập nhật và được tư vấn sớm nhất khi có thông tin về các vị trí phù hợp, bạn có thể <i>kết nối với mình qua Zalo …..</i></p><p>Chúc Bạn một ngày vui vẻ!</p>'
  );
  const { cadidate } = props;

  const onFinish = () => {
    let body = {
      to: cadidate?.email,
      subject: form.getFieldValue().subject,
      html: ckeditorData,
    };
    sendMailServices(body).then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      toast.success(`You have successfully sent email to ${cadidate?.email}`);
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ subject: 'Thư mời tham dự .....' }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Popconfirm
            onConfirm={onFinish}
            title="Are you sure to send this email?"
            icon={<QuestionCircleOutlined style={{ color: 'royalblue' }} />}
          >
            <Button type="primary" className="btn-submit mb-32 fr">
              Send Mail
            </Button>
          </Popconfirm>
        </Col>
        <Col span={24}>
          <Form.Item name="subject" label="Subject:">
            <Input placeholder="Enter subject" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="des" label="Content:">
            <CKEditor
              type="string"
              editor={ClassicEditor}
              data={ckeditorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setCkeditorData(data);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
});

export default connect(mapStateToProps)(Mail);
