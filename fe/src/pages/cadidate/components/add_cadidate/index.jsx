import React, { useState } from 'react';
import { Form } from 'antd';
import { DrawerComponent } from '../../../../components';
import { addCadidateServices } from '../../../../services/cadidateServices';
import { hasResponseError } from '../../../../utils/utils';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getAllCadidates } from '../../../../redux/stores/cadidate/actions';
import { selectJobId } from '../../../../redux/stores/job/selectors';
import FormInfo from '../form_info';

function AddCadidate(props) {
  const [form] = Form.useForm();
  const [disableEmp, setDisableEmp] = useState(false);
  const [disableEdu, setDisableEdu] = useState(false);

  const { getAllCadidates, jobId } = props;
  const { onclose, visible, params } = props;

  const onFinish = async (values) => {
    let body = {
      jobId: jobId,
      status: 'open',
      firstName: values?.firstName,
      midName: values?.midName,
      lastName: values?.lastName,
      fullName: `${values.firstName} ${values.midName} ${values.lastName}`,
      email: values?.email,
      phone: values?.phone,
      resume: {
        CV: '',
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
    await addCadidateServices(body).then((res) => {
      if (hasResponseError(res)) {
        toast.error(res.data.message);
        return;
      }
      console.log(res);
      toast.success('Add caddidate success');
    });
    getAllCadidates(params);
    onclose();
  };

  return (
    <DrawerComponent
      title="ADD CADIDATE"
      onClose={onclose}
      visible={visible}
      width={720}
    >
      <FormInfo
        form={form}
        onFinish={onFinish}
        btnName="Add"
        disableEdu={disableEdu}
        disableEmp={disableEmp}
        setDisableEdu={setDisableEdu}
        setDisableEmp={setDisableEmp}
      />
    </DrawerComponent>
  );
}

const mapStateToProps = createStructuredSelector({
  jobId: selectJobId,
});
const mapDispatchToProps = (dispatch) => ({
  getAllCadidates: (payload) => dispatch(getAllCadidates(payload)),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AddCadidate);
