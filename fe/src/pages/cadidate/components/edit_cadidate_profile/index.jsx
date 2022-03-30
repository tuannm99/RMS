import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import FormInfo from '../form_info';
import {
  editCadidate,
  getAllCadidates,
} from '../../../../redux/stores/cadidate/actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {
  cadidate_Id,
  cadidate,
} from '../../../../redux/stores/cadidate/selectors';
import moment from 'moment';

const dateFormatList = 'DD/MM/YYYY';

function EditCadidateProfile(props) {
  const [form] = Form.useForm();
  const { id, cadidate, editCadidate, params, getAllCadidates } = props;
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);

  useEffect(() => {
    if (id !== '') {
      form.setFieldsValue({
        firstName: cadidate?.firstName,
        midName: cadidate?.midName,
        lastName: cadidate?.lastName,
        email: cadidate?.email,
        phone: cadidate?.phone,
        hyperlink: cadidate?.resume?.hyperlink,
      });
      if (disableEmp) {
        form.setFieldsValue({
          designation: cadidate?.resume?.employer?.designation,
          bussinessName: cadidate?.resume?.employer?.bussinessName,

          summary: cadidate?.resume?.employer?.summary,
        });
        if (cadidate?.resume?.employer?.from !== null) {
          form.setFieldsValue({
            fromto: [
              moment(cadidate?.resume?.employer?.from, dateFormatList[0]),
              moment(cadidate?.resume?.employer?.to, dateFormatList[1]),
            ],
          });
        }
      }
      if (disableEdu) {
        form.setFieldsValue({
          degree: cadidate?.resume?.education?.degree,
          universityName: cadidate?.resume?.education?.universityName,
          fieldOfStudy: cadidate?.resume?.education?.fieldOfStudy,
          grade: cadidate?.resume?.education?.grade,
        });
        if (cadidate?.resume?.education?.from !== null) {
          form.setFieldsValue({
            fromend: [
              moment(cadidate?.resume?.education?.from, dateFormatList[0]),
              moment(cadidate?.resume?.education?.end, dateFormatList[1]),
            ],
          });
        }
      }
    }
  }, [id, cadidate, disableEmp, disableEdu, form]);

  const onFinish = async (values) => {
    let body = {
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      fullName: `${values?.firstName} ${values?.midName} ${values?.lastName}`,
      email: values?.email,
      phone: values?.phone,
      resume: {
        CV: '',
        hyperlink: values?.hyperlink,
      },
    };
    if (disableEmp) {
      body.resume = {
        ...body.resume,
        employer: {
          designation: values.designation,
          bussinessName: values.bussinessName,
          from: values.fromto[0]._d.toISOString(),
          to: values.fromto[1]._d.toISOString(),
          summary: values.summary,
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
    await editCadidate({ id, body });
    await getAllCadidates(params);
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
    />
  );
}

const mapStateToProps = createStructuredSelector({
  id: cadidate_Id,
  cadidate: cadidate,
});
const mapDispatchToProps = (dispatch) => ({
  editCadidate: (payload) => dispatch(editCadidate(payload)),
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EditCadidateProfile);
