// import React, { useState, useEffect } from 'react';
// import { Col, Row, Form, Input, Select, Button } from 'antd';
// import { toast } from 'react-toastify';
// import { hasResponseError } from '../../../utils/utils';
// import { createJobs, getAllJobs } from '../../../services/jobService';
// import { DrawerComponent } from '../../../components';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { updateJobs } from '../../../services/jobService';

// const { Option } = Select;

// function JobEdit({ onclose, visible, job, fetchJob }) {
//   const [formModal] = Form.useForm();
//   const [ckeditorData, setCkeditorData] = useState('');

//   useEffect(() => {
//     formModal.setFieldsValue({
//       id: job.id,
//       title: job.title,
//       jobDescription: job.jobDescription,
//       jobType: job.jobType,
//       location: job.location,
//       experience: job.experience,
//       skill: job.skill,
//       minSalary: job.minSalary,
//       maxSalary: job.maxSalary,
//       department: job.department,
//     });
//   }, [job.id]);

//   const onFinish = async (jobValue) => {
//     const body = {
//       ...jobValue,
//       jobDescription: ckeditorData === '' ? job.jobDescription : ckeditorData,
//     };

//     updateJobs(jobValue.id, body)
//       .then((res) => {
//         setJob(res.data);
//       })
//       .catch((err) => console.log(err));
//     toast.success('Edit Job Detail Successful!', {
//       autoClose: 3000,
//     });

//     onclose();
//   };

//   return (
//     <DrawerComponent title="Edit Job" onClose={onclose} visible={visible}>
//       <Form
//         layout="vertical"
//         hideRequiredMark
//         form={formModal}
//         name="formModal"
//         onFinish={onFinish}
//       >
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item
//               name="title"
//               label="Title Job"
//               rules={[{ required: true, message: 'Please enter user name' }]}
//             >
//               <Input placeholder="Please enter user name" />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               name="department"
//               rules={[{ required: false }]}
//               label="Department"
//             >
//               <Select style={{ width: 300 }}>
//                 <Option value="Administrtion">Administrtion</Option>
//                 <Option value="Finance">Finance</Option>
//                 <Option value="Maketing">Maketing</Option>
//                 <Option value="Sale">Sale</Option>
//                 <Option value="Dev">Dev</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="jobType"
//               label="Job Type"
//               rules={[{ required: false }]}
//             >
//               <Select style={{ width: 300 }}>
//                 <Option value="Full Time">Full Time</Option>
//                 <Option value="Pass Time">Pass Time</Option>
//                 <Option value="Remote">Internship</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="location"
//               label="Location"
//               rules={[{ required: false }]}
//             >
//               <Input placeholder="address" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={24}>
//             <Form.Item name="jobDescription" label="Description">
//               <CKEditor
//                 type="string"
//                 editor={ClassicEditor}
//                 onChange={(event, editor) => {
//                   const data = editor.getData();
//                   setCkeditorData(data);
//                 }}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="skill"
//               label="Skills"
//               rules={[{ required: false }]}
//             >
//               <Input placeholder="skill" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="experience"
//               label="Experience"
//               rules={[{ required: false }]}
//             >
//               <Select style={{ width: 300 }}>
//                 <Option value="Internship">Internship</Option>
//                 <Option value="Entry level">Entry level</Option>
//                 <Option value="Asociate">Asociate</Option>
//                 <Option value="Mid-senior level">Mid-senior level</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={16}>
//           <Col span={4}>
//             <Form.Item
//               name="minSalary"
//               label="Salary"
//               rules={[{ required: false }]}
//             >
//               <Input placeholder="minSalary" />
//             </Form.Item>
//           </Col>

//           <Col span={4}>
//             <Form.Item name="maxSalary" label=" " rules={[{ required: false }]}>
//               <Input placeholder="maxSalary" />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Form.Item
//           className="Detail-id"
//           name="id"
//           rules={[{ required: false }]}
//         >
//           <Input disabled />
//         </Form.Item>
//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </DrawerComponent>
//   );
// }

// export default JobEdit;
