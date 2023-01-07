import React, { CSSProperties, forwardRef } from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/index.js';

import StickyElement from './StickyElement.js';

const styled = _styled.default || _styled;

const StickyCanvasContainer = styled(StickyElement)(() => ({
  top: 0,
  height: '100%',
}));

const VideoCanvas = styled('canvas')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
}));

interface StickyCanvasProps {
  style?: CSSProperties;
}
const StickyCanvas = forwardRef<HTMLCanvasElement, StickyCanvasProps>(({ style }, ref) => {
  const { heightRatio } = useScrollContext();

  return (
    <StickyCanvasContainer style={style}>
      <VideoCanvas
        ref={ref}
        width="1920"
        height="1080"
        style={{
          transform: `translate3D(-50%, -50%, 0) scale(${heightRatio})`,
        }}
      />
    </StickyCanvasContainer>
  );
});
StickyCanvas.defaultProps = {
  style: undefined,
};

export default StickyCanvas;
