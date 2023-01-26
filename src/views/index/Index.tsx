import React from 'react';
import _styled from '@emotion/styled';

import { ScrollContextProvider } from '@/contexts/index.js';

import LocalNav from './components/LocalNav.js';
import ScrollSection1 from './ScrollSection1.js';
import ScrollSection2 from './ScrollSection2.js';
import ScrollSection3 from './ScrollSection3.js';

const styled = _styled.default || _styled;

const IndexContainer = styled('div')(() => ({
  overflowX: 'hidden',
}));

export default function Index() {
  return (
    <IndexContainer>
      <ScrollContextProvider>
        <LocalNav />
        <ScrollSection1 />
        <ScrollSection2 />
        <ScrollSection3 />
      </ScrollContextProvider>
    </IndexContainer>
  );
}
