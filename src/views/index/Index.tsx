import React from 'react';

import { ScrollContextProvider } from '@/contexts/index.js';

import LocalNav from './components/LocalNav.js';
import ScrollSection1 from './ScrollSection1.js';
import ScrollSection2 from './ScrollSection2.js';

export default function Index() {
  return (
    <ScrollContextProvider>
      <LocalNav />
      <ScrollSection1 />
      <ScrollSection2 />
    </ScrollContextProvider>
  );
}
