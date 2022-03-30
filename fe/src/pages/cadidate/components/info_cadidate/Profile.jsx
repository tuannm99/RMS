import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Row, Col, Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

function Profile(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);

  const allowedFiles = ['application/pdf'];

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
    console.log(info);
    if (info && allowedFiles.includes(info.file.type)) {
      getBase64(info.file.originFileObj, (fileUrl) => setPdfFile([fileUrl]));
      setNameFile(info.file.originFileObj.name);
    } else {
      alert('Please choose PDF file!');
    }
  };
  console.log(pdfFile);
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
            {nameFile}{' '}
            <DeleteOutlined
              className="cu ml-28"
              style={{ fontSize: '16px', color: '#08c' }}
              onClick={() => setPdfFile(null)}
            />
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
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
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

export default Profile;
