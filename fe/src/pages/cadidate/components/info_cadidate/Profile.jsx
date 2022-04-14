import React, { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Row, Col, Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { cadidate } from '../../../../redux/stores/cadidate/selectors';
import { editCadidate } from '../../../../redux/stores/cadidate/actions';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { imgURL } from '../../../../utils/utils';
import { compose } from 'recompose';

function Profile(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { cadidate, account, editCadidate } = props;

  const [pdfFile, setPdfFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [file, setFile] = useState(null);

  const allowedFiles = ['application/pdf'];

  useEffect(() => {
    setPdfFile([`${imgURL}${cadidate?.cv?.path}`]);
    setNameFile(cadidate?.cv?.originalname);
  }, [cadidate?.id]);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
    if (info && allowedFiles.includes(info.file.type)) {
      getBase64(info.file.originFileObj, (fileUrl) => setPdfFile([fileUrl]));
      setNameFile(info.file.originFileObj.name);
      setFile(info.file.originFileObj);
    } else {
      alert('Please choose PDF file!');
    }
  };

  const handleChangeCv = async () => {
    const formRes = new FormData();
    formRes.append('cv', file);
    await editCadidate({ id: cadidate?.id, body: formRes });
    setPdfFile([`${imgURL}${cadidate?.cv?.path}`]);
    setNameFile(cadidate?.cv?.originalname);
  };

  return (
    <Row>
      {account?.role === 'hiringManager' && (
        <>
          <Col span={12}>
            <Upload onChange={handleFile} maxCount={1} fileList={pdfFile}>
              <Button type="primary" icon={<UploadOutlined />}>
                CV
              </Button>
            </Upload>
            {pdfFile && (
              <>
                {nameFile}
                {nameFile !== cadidate?.cv?.originalname && (
                  <DeleteOutlined
                    className="cu"
                    style={{ fontSize: '16px', color: '#08c' }}
                    onClick={() => {
                      setPdfFile([`${imgURL}${cadidate?.cv?.path}`]);
                      setNameFile(cadidate?.cv?.originalname);
                    }}
                  />
                )}
              </>
            )}
          </Col>
          <Col span={12}>
            <Button className="fr" type="primary" onClick={handleChangeCv}>
              UPDATE
            </Button>
          </Col>
        </>
      )}
      <Col span={24} className="mt-20">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile[0]}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}
        {!pdfFile && <>No file is selected yet</>}
      </Col>
    </Row>
  );
}

const mapStateToProps = createStructuredSelector({
  cadidate: cadidate,
  account: selectUserInfor,
});
const mapDispatchToProps = (dispatch) => ({
  editCadidate: (payload) => dispatch(editCadidate(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Profile);
