import api from './api';

const getListJobs = () => api.get(api.url.Jobs).then((res) => res.data);

const getIdJobs = (id) =>
  api.get(`${api.url.Jobs}/${id}`).then((res) => res.data);

const createJobs = (data) =>
  api.post(api.url.Jobs, data).then((res) => res.data);
const updateJobs = (id, data) =>
  api.put(`${api.url.Jobs}/${id}`, data).then((res) => res.data);
const deleteJobs = (id) =>
  api.delete(`${api.url.Jobs}/${id}`).then((res) => res.data);
const jobService = {
  getListJobs,
  getIdJobs,
  createJobs,
  updateJobs,
  deleteJobs,
};
export default jobService;
