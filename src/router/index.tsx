import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App.js';
import Index from '@/views/index/Index.js';

const ROOT = '/';

const router = createBrowserRouter([
  {
    path: ROOT,
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROOT} replace />,
  },
]);

export default router;
