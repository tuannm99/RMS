import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Row, Col, Button } from 'antd';

function Profile(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [pdfFile, setPdfFile] = useState(null);

  const [pdfError, setPdfError] = useState('');
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        };
      } else {
        alert("Please choose file PDF!")
      }
  };
  return (
    <Row>
      <Col span={12}>
        <form>
          <input
            type="file"
            onChange={handleFile}
          ></input>
          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>
      </Col>
      <Col span={12}>
        <Button className='fr' type='primary'>UPDATE</Button>
      </Col>
      <Col span={24} className="mt-20">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile && <>No file is selected yet</>}
      </Col>
    </Row>
  );
}

export default Profile;
