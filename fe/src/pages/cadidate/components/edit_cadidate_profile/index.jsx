import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import FormInfo from '../form_info';
import {
  getCadidate,
  editCadidate,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  cadidate_Id,
  cadidate,
} from '../../../../redux/stores/cadidate/selectors';
import moment from 'moment';
import { updateCadidateServices } from '../../../../services/cadidateServices';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';

const dateFormatList = 'DD/MM/YYYY';

function EditCadidateProfile(props) {
  const [form] = Form.useForm();
  const { id, cadidate, getCadidate } = props;
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);

  useEffect(() => {
    form.resetFields();
    setDisableEdu(false);
    setDisableEdu(false);
    if (id !== '') {
      form.setFieldsValue({
        firstName: cadidate?.firstName,
        midName: cadidate?.midName,
        lastName: cadidate?.lastName,
        email: cadidate?.email,
        phone: cadidate?.phone.slice(3),
        sex: cadidate?.sex,
        hyperlink: cadidate?.hyperlink,
      });
      if (
        cadidate?.employer?.designation ||
        cadidate?.employer?.bussinessName ||
        cadidate?.employer?.summary ||
        cadidate?.employer?.from
      ) {
        setDisableEmp(true);
        form.setFieldsValue({
          designation: cadidate?.employer?.designation,
          bussinessName: cadidate?.employer?.bussinessName,
          summary: cadidate?.employer?.summary,
          fromto: [
            moment(cadidate?.employer?.from),
            moment(cadidate?.employer?.to),
          ],
        });
      } else {
        setDisableEmp(false);
      }
      if (
        cadidate?.education?.degree ||
        cadidate?.education?.universityName ||
        cadidate?.education?.fieldOfStudy ||
        cadidate?.education?.grade ||
        cadidate?.education?.from
      ) {
        setDisableEdu(true);
        form.setFieldsValue({
          degree: cadidate?.education?.degree,
          universityName: cadidate?.education?.universityName,
          fieldOfStudy: cadidate?.education?.fieldOfStudy,
          grade: cadidate?.education?.grade,
          fromend: [
            moment(cadidate?.education?.from),
            moment(cadidate?.education?.end),
          ],
        });
      } else {
        setDisableEdu(false);
      }
    }
  }, [id, cadidate, form]);

  const onFinish = async (values) => {
    const formRes = new FormData();

    let body = {
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      fullName: `${values?.lastName} ${
        values?.midName === undefined ? '' : values?.midName
      } ${values?.firstName}`,
      email: values?.email,
      phone: `${values?.prefix}${values?.phone}`,
      sex: values?.sex,
      hyperlink: values?.hyperlink,
      cv: cadidate?.cv,
    };
    if (disableEmp) {
      body = {
        ...body,
        employer: {
          designation: values?.designation,
          bussinessName: values?.bussinessName,
          from: values?.fromto[0]?._d?.toISOString(),
          to: values?.fromto[1]?._d?.toISOString(),
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
          from: values?.fromend[0]?._d?.toISOString(),
          end: values?.fromend[1]?._d?.toISOString(),
        },
      };
    }

    formRes.append('candidate', JSON.stringify(body));
    const resEdit = await updateCadidateServices({ id, body: formRes });
    if (hasResponseError(resEdit)) {
      toast.error(resEdit.data.message);
      return;
    }
    toast.success(`Edit information candidate success!`);
    form.resetFields();
    getCadidate(id);
    props.handleCancel();
  };

  return (
    <FormInfo
      form={form}
      onFinish={onFinish}
      btnName="Edit"
      disableEdu={disableEdu}
      disableEmp={disableEmp}
      setDisableEdu={setDisableEdu}
      setDisableEmp={setDisableEmp}
      stylesBtn={{ position: 'absolute', top: '10px', right: '15px' }}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  id: cadidate_Id,
  cadidate: cadidate,
});
const mapDispatchToProps = (dispatch) => ({
  getCadidate: (payload) => dispatch(getCadidate(payload)),
  editCadidate: (payload) => dispatch(editCadidate(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditCadidateProfile);
