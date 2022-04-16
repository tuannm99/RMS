import {
  DashboardPage,
  RecruitPage,
  CadidatePage,
  DetailRecruitPage,
  ProfilePage,
  EmployeePage,
  Home,
  HomeDetail,
  Login,
  ForgotPassPage,
  ChangePass,
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
  {
    path: '/changepass',
    element: <ChangePass />,
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
    element: <ForgotPassPage />,
  },
];
