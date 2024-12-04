import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import DashboardPage from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
