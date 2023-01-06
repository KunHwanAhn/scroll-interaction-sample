import React from 'react';

import { ScrollContextProvider } from '@/contexts/index.js';

import LocalNav from './components/LocalNav.js';
import ScrollSection1 from './ScrollSection1.js';

export default function Index() {
  return (
    <ScrollContextProvider>
      <LocalNav />
      <ScrollSection1 />
      {/* TODO: 스크롤 발생용 임시 블록 */}
      <div style={{ height: '2000px' }} />
    </ScrollContextProvider>
  );
}
