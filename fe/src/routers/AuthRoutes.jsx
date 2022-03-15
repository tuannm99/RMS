import React from 'react';
import {
  DashboardPage,
  RecruitPage,
  TaskRecruitmentPage,
  DetailRecruitPage,
  ConversationRecruitmentPage,
  ProfilePage,
  EmployeePage,
} from '../pages';

import { Routes, Route } from 'react-router-dom';

function AuthRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/recruit" element={<RecruitPage />} />
      <Route path="/recruit/:id" element={<DetailRecruitPage />} />
      <Route path="/conversation" element={<ConversationRecruitmentPage />} />
      <Route path="/taskRecruitment" element={<TaskRecruitmentPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/employee/:visible" element={<EmployeePage />} />
    </Routes>
  );
}

export default AuthRoutes;
