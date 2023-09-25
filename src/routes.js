import { Navigate, useRoutes } from 'react-router-dom';
import SimpleLayout from './layouts/simple';
import DtoPage from './pages/DtoPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '/', element: <DtoPage />, index: true },
        // { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
