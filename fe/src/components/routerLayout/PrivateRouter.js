import React from 'react';
import {
  DashboardPage,
  RecruitPage,
  TaskRecruitmentPage,
  DetailRecruitPage,
  ConversationRecruitmentPage,
<<<<<<< HEAD
} from '../../pages/index';

=======
  ProfilePage,
} from '../../pages/index';
>>>>>>> 6f6f96d24360db3ecdf1943da5798ebb7de85bac
import { Routes, Route } from 'react-router-dom';
function PrivateRouter(props) {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/recruit" element={<RecruitPage />} />
      <Route path="/recruit/:id" element={<DetailRecruitPage />} />
      <Route path="/conversation" element={<ConversationRecruitmentPage />} />
      <Route path="/taskRecruitment" element={<TaskRecruitmentPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default PrivateRouter;
