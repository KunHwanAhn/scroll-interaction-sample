import React from 'react';
// eslint-disable-next-line import/extensions
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router/index.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
