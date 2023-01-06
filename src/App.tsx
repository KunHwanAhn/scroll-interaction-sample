import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import '@/styles/index.scss';
import { lightTheme } from '@/styles/theme.js';

import GlobalNav from '@/components/GlobalNav.js';

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalNav />
      <Outlet />
    </ThemeProvider>
  );
}
