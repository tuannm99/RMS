import React, { useState } from 'react';
import { Button, Col, Form, Row, Upload } from 'antd';
import { DrawerComponent } from '../../../../components';
import { addCadidateServices } from '../../../../services/cadidateServices';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  cadidates,
  visibleAddCadi,
} from '../../../../redux/stores/cadidate/selectors';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import { selectJobId } from '../../../../redux/stores/job/selectors';
import FormInfo from '../form_info';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

function AddCadidate(props) {
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [fileList, setFileList] = useState(null);

  const allowedFiles = ['application/pdf'];

  const {
    jobId,
    onclose,
    params,
    cadidates,
    setParams,
    visibleAddCadi,
    account,
  } = props;

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
    if (info.file.originFileObj.size > 1024 * 1024 * 1) {
      alert('Please choose PDF file less than 1mb!');
      return;
    }
    if (info && allowedFiles.includes(info.fileList[0].type)) {
      getBase64(info.fileList[0].originFileObj, (fileUrl) =>
        setPdfFile([fileUrl])
      );
      setFileList(info.fileList[0].originFileObj);
      setNameFile(info.fileList[0].originFileObj.name);
    } else {
      alert('Please choose PDF file!');
    }
  };

  const onFinish = async (values) => {
    const formRes = new FormData();

    let body = {
      jobId: jobId,
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      fullName: `${values?.lastName} ${
        values?.midName === undefined ? '' : values?.midName
      } ${values?.firstName}`,
      referral: account?.fullName,
      sex: values?.sex,
      email: values?.email,
      phone: `${values?.prefix}${values?.phone}`,
      hyperlink: values?.hyperlink,
      employer: {
        designation: '',
        bussinessName: '',
        from: '',
        to: '',
        summary: '',
      },
      education: {
        degree: '',
        universityName: '',
        fieldOfStudy: '',
        grade: '',
        from: '',
        end: '',
      },
    };
    if (disableEmp) {
      body = {
        ...body,
        employer: {
          designation: values?.designation,
          bussinessName: values?.bussinessName,
          from: values.fromto[0]._d.toISOString(),
          to: values.fromto[1]._d.toISOString(),
          summary: values?.summary,
        },
      };
    }
    if (disableEdu) {
      body = {
        ...body,
        education: {
          degree: values?.degree,
          universityName: values?.universityName,
          fieldOfStudy: values?.fieldOfStudy,
          grade: values?.grade,
          from: values?.fromend[0]._d.toISOString(),
          end: values?.fromend[1]._d.toISOString(),
        },
      };
    }
    if (!fileList) {
      toast.error('Please upload CV!');
      return;
    }

    formRes.append('cv', fileList);
    formRes.append('candidate', JSON.stringify(body));
    const res = await addCadidateServices(formRes);
    if (hasResponseError(res)) {
      toast.error(res.data.message);
      return;
    }
    toast.success('Add caddidate success');

    if (
      cadidates?.totalResults >= cadidates?.limit &&
      cadidates?.totalResults % 10 === 0
    ) {
      await setParams({ ...params, page: cadidates?.page + 1 });
    } else {
      await setParams({ ...params });
    }

    form.resetFields();
    setFileList(null);
    setNameFile(null);
    setPdfFile(null);
    onclose();
  };

  return (
    <DrawerComponent
      title="CREATE CANDIDATE PROFILE"
      onClose={onclose}
      visible={visibleAddCadi}
      width={720}
    >
      <Row>
        <Col span={24} className="mb-32">
          <Upload onChange={handleFile} maxCount={1} fileList={pdfFile}>
            <Button type="primary" icon={<UploadOutlined />}>
              CV
            </Button>
          </Upload>
          {pdfFile && (
            <>
              <span style={{ color: 'green' }}>{nameFile}</span>
              <DeleteOutlined
                className="cu ml-28"
                style={{ fontSize: '16px', color: '#08c' }}
                onClick={() => {
                  setFileList(null);
                  setNameFile(null);
                  setPdfFile(null);
                }}
              />
            </>
          )}
        </Col>
      </Row>
      <FormInfo
        form={form}
        onFinish={onFinish}
        btnName="Add"
        disableEdu={disableEdu}
        disableEmp={disableEmp}
        setDisableEdu={setDisableEdu}
        setDisableEmp={setDisableEmp}
        stylesBtn={{ position: 'absolute', top: '10px', right: '15px' }}
      />
    </DrawerComponent>
  );
}

const mapStateToProps = createStructuredSelector({
  jobId: selectJobId,
  cadidates: cadidates,
  visibleAddCadi: visibleAddCadi,
  account: selectUserInfor,
});

export default connect(mapStateToProps)(AddCadidate);
