import React from 'react';
import {
  DashboardPage,
  RecruitPage,
  TaskRecruitmentPage,
  DetailRecruitPage,
  ConversationRecruitmentPage,
} from '../../pages/index';

import { Routes, Route } from 'react-router-dom';
function PrivateRouter(props) {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/recruit" element={<RecruitPage />} />
      <Route path="/recruit/:id" element={<DetailRecruitPage />} />
      <Route path="/conversation" element={<ConversationRecruitmentPage />} />
      <Route path="/taskRecruitment" element={<TaskRecruitmentPage />} />
    </Routes>
  );
}

export default PrivateRouter;
