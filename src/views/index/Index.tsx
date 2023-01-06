import React from 'react';

import { ScrollContextProvider } from '@/contexts/index.js';

import LocalNav from './components/LocalNav.js';

export default function Index() {
  return (
    <ScrollContextProvider>
      <LocalNav />
    </ScrollContextProvider>
  );
}
