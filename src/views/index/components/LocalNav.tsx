import React from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/index.js';

const styled = _styled.default || _styled;

const Nav = styled('nav')(() => ({
  position: 'absolute',
  top: '45px',
  left: 0,
  width: '100%',
  height: '52px',
  borderBottom: '1px solid #dddddd',
  zIndex: 11,
  backgroundColor: 'rgba(255, 255, 255, .1)',
  backdropFilter: 'saturate(180%) blur(15px)',

  '&.fixed': {
    position: 'fixed',
    top: 0,
  },
}));

const NavLinkContainer = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${theme.spacing(1)}`,
  maxWidth: theme.contentMaxWidth,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export default function LocalNav() {
  const { scrollY } = useScrollContext();

  return (
    <Nav className={`${scrollY > 44 ? 'fixed' : ''}`}>
      <NavLinkContainer>Local Nav</NavLinkContainer>
    </Nav>
  );
}
