import React, { forwardRef, ReactNode } from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/index.js';

const styled = _styled.default || _styled;

const Section = styled('div')(() => ({ position: 'relative' }));

interface NormalSectionType { type: 'normal' }
interface StickySectionType { type: 'sticky', heightNum: number }
type ScrollSectionType = NormalSectionType | StickySectionType;
type ScrollSectionProps = ScrollSectionType & {
  children: ReactNode
};
export default forwardRef<HTMLDivElement, ScrollSectionProps>((props, ref) => {
  const { children, type } = props;
  const { innerHeight } = useScrollContext();

  if (type === 'normal') {
    return (
      <Section ref={ref}>
        {children}
      </Section>
    );
  }

  const { heightNum } = props;

  return (
    <Section
      ref={ref}
      style={{
        height: heightNum * innerHeight,
      }}
    >
      {children}
    </Section>
  );
});
