import _styled from '@emotion/styled';

const styled = _styled.default || _styled;

const StickyElement = styled('div')(() => ({
  position: 'fixed',
  left: 0,
  width: '100%',
  willChange: 'opacity, transform',
}));

export default StickyElement;
