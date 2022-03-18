import React from 'react';
import {
  DashboardPage,
  RecruitPage,
  CadidatePage,
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
      <Route path="/cadidate" element={<CadidatePage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
      <Route path="/employee/:visible/:userID" element={<EmployeePage />} />
    </Routes>
  );
}

export default AuthRoutes;
