import React, {
  useRef,
  useMemo,
  CSSProperties,
} from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/ScrollContext.js';

import { calcValueWithScroll } from './utils.js';

import ScrollSection from './components/ScrollSection.js';
import StickyElement from './components/StickyElement.js';

const styled = _styled.default || _styled;

const POSITION_TOP = '40vh';
const SECTION_HEIGHT_NUM = 5;

const ANIMATIONS_INFO = {
  MESSAGE_A: {
    IN: {
      START: 0.1,
      END: 0.2,
      OPACITY: [0, 1],
      TRANSLATE_Y: [20, 0],
    },
    OUT: {
      START: 0.25,
      END: 0.3,
      OPACITY: [1, 0],
      TRANSLATE_Y: [0, -20],
    },
  },
  MESSAGE_B: {
    IN: {
      START: 0.3,
      END: 0.4,
      OPACITY: [0, 1],
      TRANSLATE_Y: [20, 0],
    },
    OUT: {
      START: 0.45,
      END: 0.5,
      OPACITY: [1, 0],
      TRANSLATE_Y: [0, -20],
    },
  },
  MESSAGE_C: {
    IN: {
      START: 0.5,
      END: 0.6,
      OPACITY: [0, 1],
      TRANSLATE_Y: [20, 0],
    },
    OUT: {
      START: 0.65,
      END: 0.7,
      OPACITY: [1, 0],
      TRANSLATE_Y: [0, -20],
    },
  },
  MESSAGE_D: {
    IN: {
      START: 0.7,
      END: 0.8,
      OPACITY: [0, 1],
      TRANSLATE_Y: [20, 0],
    },
    OUT: {
      START: 0.85,
      END: 0.9,
      OPACITY: [1, 0],
      TRANSLATE_Y: [0, -20],
    },
  },
};

type Messages = keyof typeof ANIMATIONS_INFO;
const getAnimation = (key: Messages, scrollRatio: number) => {
  const { IN, OUT } = ANIMATIONS_INFO[key];
  let result = IN;

  if (IN.END < scrollRatio) {
    result = OUT;
  }

  return result;
};

const MainTitle = styled('h1')(({ theme }) => ({
  paddingTop: '45vh',
  position: 'relative',
  zIndex: 5,
  textAlign: 'center',
  fontSize: '3rem',

  [theme.breakpoints.desktop]: {
    fontSize: '9vw',
  },
}));

const SubTitle = styled('p')(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.desktop]: {
    fontSize: '4vw',
  },
}));

export default function ScrollSection1() {
  const { innerHeight, scrollY } = useScrollContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionHeight = useMemo(() => innerHeight * SECTION_HEIGHT_NUM, [innerHeight]);
  const currYOffset = scrollY - (sectionRef.current?.offsetTop ?? 0);
  const scrollRatio = currYOffset / sectionHeight;

  const style: CSSProperties = {
    top: POSITION_TOP,
    display: sectionHeight < scrollY ? 'none' : undefined,
  };

  const animationMessageA = getAnimation('MESSAGE_A', scrollRatio);
  const animationMessageB = getAnimation('MESSAGE_B', scrollRatio);
  const animationMessageC = getAnimation('MESSAGE_C', scrollRatio);
  const animationMessageD = getAnimation('MESSAGE_D', scrollRatio);

  const styleA: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      [animationMessageA.OPACITY[0], animationMessageA.OPACITY[1], { start: animationMessageA.START, end: animationMessageA.END }],
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      [animationMessageA.TRANSLATE_Y[0], animationMessageA.TRANSLATE_Y[1], { start: animationMessageA.START, end: animationMessageA.END }],
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };

  const styleB: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      [animationMessageB.OPACITY[0], animationMessageB.OPACITY[1], { start: animationMessageB.START, end: animationMessageB.END }],
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      [animationMessageB.TRANSLATE_Y[0], animationMessageB.TRANSLATE_Y[1], { start: animationMessageB.START, end: animationMessageB.END }],
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };
  const styleC: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      [animationMessageC.OPACITY[0], animationMessageC.OPACITY[1], { start: animationMessageC.START, end: animationMessageC.END }],
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      [animationMessageC.TRANSLATE_Y[0], animationMessageC.TRANSLATE_Y[1], { start: animationMessageC.START, end: animationMessageC.END }],
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };
  const styleD: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      [animationMessageD.OPACITY[0], animationMessageD.OPACITY[1], { start: animationMessageD.START, end: animationMessageD.END }],
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      [animationMessageD.TRANSLATE_Y[0], animationMessageD.TRANSLATE_Y[1], { start: animationMessageD.START, end: animationMessageD.END }],
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };

  return (
    <ScrollSection
      ref={sectionRef}
      type="sticky"
      heightNum={SECTION_HEIGHT_NUM}
    >
      <MainTitle>Main Title</MainTitle>
      <StickyElement style={styleA}>
        <SubTitle>Subtitle 1</SubTitle>
      </StickyElement>
      <StickyElement style={styleB}>
        <SubTitle>Subtitle 2</SubTitle>
      </StickyElement>
      <StickyElement style={styleC}>
        <SubTitle>Subtitle 3</SubTitle>
      </StickyElement>
      <StickyElement style={styleD}>
        <SubTitle>Subtitle 4</SubTitle>
      </StickyElement>
    </ScrollSection>
  );
}
