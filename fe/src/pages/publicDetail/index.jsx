import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';
import { getPublishJobDetail } from '../../services/careerServices';
import { TiArrowLeftThick } from 'react-icons/ti';
import FormInfo from '../cadidate/components/form_info';
import { Button, Col, Row, Upload, Form } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { addCadidatePublicServices } from '../../services/cadidateServices';
import { hasResponseErrorPublic } from '../../utils/utils';

function HomeDetail(props) {
  const [job, setJob] = useState({});
  let { id } = useParams();
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [visibleForm, setVisibleForm] = useState(false);
  const allowedFiles = ['application/pdf'];
  const formRef = useRef();

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
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

  useEffect(() => {
    fetchJob();
    return () => {
      setJob({});
    };
  }, []);

  const fetchJob = async () => {
    const jobDetail = await getPublishJobDetail(id);
    setJob(jobDetail.data);
  };

  const handleAddCandidate = async () => {
    await setVisibleForm(!visibleForm);
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const onFinish = async (values) => {
    const formRes = new FormData();

    let body = {
      jobId: id,
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      sex: values?.sex,
      referral: `${values?.firstName} ${
        values?.midName === undefined ? '' : values?.midName
      } ${values?.lastName}`,
      fullName: `${values?.firstName} ${
        values?.midName === undefined ? '' : values?.midName
      } ${values?.lastName}`,
      email: values?.email,
      phone: values?.phone,
      hyperlink: values?.hyperlink,
      resume: {
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
      },
    };
    if (disableEmp) {
      body.resume = {
        ...body.resume,
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
      body.resume = {
        ...body.resume,
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
    const res = await addCadidatePublicServices(id, formRes);
    if (hasResponseErrorPublic(res)) {
      toast.error(res.data.message);
      return;
    }
    toast.success('Add career success!');
    form.resetFields();
    setFileList(null);
    setNameFile(null);
    setPdfFile(null);
  };

  return (
    <>
      <div className="detail-public-header">
        <div className="detail-public-header-content">
          <div className="detail-public-header-left">
            <div className="detail-public-sub">
              <Link to={`/PublicJob`}>
                <TiArrowLeftThick className="detail-public-icon" />
              </Link>
              <h3>{job.department}</h3>
            </div>
            <h1>{job.title}</h1>
            <div className="detail-public-header-sub">
              <span>{job.location}</span> | <span>{job.jobType}</span>
            </div>
          </div>
          <div className="detail-public-header-right">
            <button onClick={handleAddCandidate}>Apply Now</button>
          </div>
        </div>
      </div>
      <div className="detail-public-content">
        <span>{job.description}</span>
        <div className="detail-public-content-list">
          <span dangerouslySetInnerHTML={{ __html: job.jobDescription }}></span>
        </div>
        {visibleForm && (
          <div className="form-career" ref={formRef}>
            <Row>
              <Col span={24} className="mb-32">
                <Upload onChange={handleFile} maxCount={1} fileList={pdfFile}>
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    style={{ backgroundColor: '#6a5376' }}
                  >
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
              btnName="Apply career"
              disableEdu={disableEdu}
              disableEmp={disableEmp}
              setDisableEdu={setDisableEdu}
              setDisableEmp={setDisableEmp}
              stylesBtn={{
                width: '100%',
                margin: '50px 0',
                height: '50px',
                backgroundColor: '#1ebea5',
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default HomeDetail;
