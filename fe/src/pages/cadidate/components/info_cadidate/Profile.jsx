import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Row, Col, Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { cadidate } from '../../../../redux/stores/cadidate/selectors';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { imgURL } from '../../../../utils/utils';

function Profile(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { cadidate } = props;

  const [pdfFile, setPdfFile] = useState([
    `${imgURL}${cadidate?.resume?.cv?.path}`,
  ]);
  const [nameFile, setNameFile] = useState(cadidate?.resume?.cv?.originalname);

  const allowedFiles = ['application/pdf'];

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
    if (info && allowedFiles.includes(info.file.type)) {
      getBase64(info.file.originFileObj, (fileUrl) => setPdfFile([fileUrl]));
      setNameFile(info.file.originFileObj.name);
    } else {
      alert('Please choose PDF file!');
    }
  };
  return (
    <Row>
      <Col span={12}>
        <Upload onChange={handleFile} maxCount={1} fileList={pdfFile}>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
        {pdfFile && (
          <>
            {nameFile}
            {nameFile !== cadidate?.resume?.cv?.originalname && (
              <DeleteOutlined
                className="cu"
                style={{ fontSize: '16px', color: '#08c' }}
                onClick={() => {
                  setPdfFile([`${imgURL}${cadidate?.resume?.cv?.path}`]);
                  setNameFile(cadidate?.resume?.cv?.originalname);
                }}
              />
            )}
          </>
        )}
      </Col>
      <Col span={12}>
        <Button className="fr" type="primary">
          UPDATE
        </Button>
      </Col>
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
});

export default connect(mapStateToProps)(Profile);
