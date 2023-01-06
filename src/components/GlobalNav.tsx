import React, { useState, useEffect } from 'react';
import _styled from '@emotion/styled';

const styled = _styled.default || _styled;

const Nav = styled('nav')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '44px',
  zIndex: 10,
}));

const NavLinkContainer = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: `0 ${theme.spacing(1)}`,
  maxWidth: theme.contentMaxWidth,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export default function GlobalNav() {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  useEffect(() => {
    function updateScrollY() {
      setScrollY(() => window.scrollY);
    }

    window.addEventListener('scroll', updateScrollY);

    return () => {
      window.removeEventListener('scroll', updateScrollY);
    };
  }, []);

  if (scrollY > 44) {
    return null;
  }

  return (
    <Nav>
      <NavLinkContainer>Global Nav</NavLinkContainer>
    </Nav>
  );
}
