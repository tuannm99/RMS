import React, { useEffect, useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Row, Col, Button, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  cadidate,
  cadidate_Id,
} from '../../../../redux/stores/cadidate/selectors';
import { getCadidate } from '../../../../redux/stores/cadidate/actions';
import { selectUserInfor } from '../../../../redux/stores/auth/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { hasResponseError, imgURL } from '../../../../utils/utils';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import { updateCadidateServices } from '../../../../services/cadidateServices';

function Profile(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { cadidate, account, id, getCadidate } = props;

  const [pdfFile, setPdfFile] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [file, setFile] = useState(null);

  const allowedFiles = ['application/pdf'];

  useEffect(() => {
    setPdfFile([`${imgURL}${cadidate?.cv?.path}`]);
    setNameFile(cadidate?.cv?.originalname);
  }, [cadidate?.id, cadidate?.cv?.path, cadidate?.cv?.originalname]);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleFile = (info) => {
    if (info.file.originFileObj.size > 1024 * 1024 * 5) {
      alert('Please choose PDF file less than 5mb!');
      return;
    }
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
    const resEdit = await updateCadidateServices({ id, body: formRes });
    if (hasResponseError(resEdit)) {
      toast.error(resEdit.data.message);
      return;
    }
    toast.success(`Edit information candidate success!`);
    getCadidate(id);
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
  id: cadidate_Id,
});
const mapDispatchToProps = (dispatch) => ({
  getCadidate: (payload) => dispatch(getCadidate(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Profile);
