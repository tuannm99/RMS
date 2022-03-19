import {
  DashboardPage,
  RecruitPage,
  CadidatePage,
  DetailRecruitPage,
  ConversationRecruitmentPage,
  ProfilePage,
  EmployeePage,
  Home,
  HomeDetail,
  Login,
  ChangePassPage,
} from '../pages';
import { ProtectedLayout } from '../layout';

export const AuthRoute = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/recruit',
    element: <RecruitPage />,
  },
  {
    path: '/recruit/:id',
    element: <DetailRecruitPage />,
  },
  {
    path: '/conversation',
    element: <ConversationRecruitmentPage />,
  },
  {
    path: '/cadidate',
    element: <CadidatePage />,
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
  },
  {
    path: '/employee/:visible/:userID',
    element: <EmployeePage />,
  },
];

export const AppRoute = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: <ProtectedLayout />,
  },
  {
    path: '/PublicJob',
    element: <Home />,
  },
  {
    path: '/PublicJob/:id',
    element: <HomeDetail />,
  },
  {
    path: '/changePassword',
    element: <ChangePassPage />,
  },
];
