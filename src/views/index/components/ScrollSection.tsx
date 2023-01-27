import React, { forwardRef, ReactNode } from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/index.js';

const styled = _styled.default || _styled;

const Section = styled('div')(() => ({
  paddingTop: '45vh',
  position: 'relative',
}));

interface NormalSectionType { type: 'normal' }
interface StickySectionType { type: 'sticky', heightNum: number }
type ScrollSectionType = NormalSectionType | StickySectionType;
type ScrollSectionProps = ScrollSectionType & {
  children: ReactNode;
  className?: string;
};

const ScrollSection = forwardRef<HTMLDivElement, ScrollSectionProps>((props, ref) => {
  const { children, type, className } = props;
  const { innerHeight } = useScrollContext();

  if (type === 'normal') {
    return (
      <Section
        ref={ref}
        className={className}
      >
        {children}
      </Section>
    );
  }

  const { heightNum } = props;

  return (
    <Section
      ref={ref}
      className={className}
      style={{
        height: heightNum * innerHeight,
      }}
    >
      {children}
    </Section>
  );
});
ScrollSection.defaultProps = {
  className: undefined,
};

export default ScrollSection;
