import React, {
  useRef,
  useMemo,
  CSSProperties,
} from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/ScrollContext.js';

import {
  calcValueWithScroll,
  createValues,
  ValueStartEnd,
} from './utils.js';

import ScrollSection from './components/ScrollSection.js';
import StickyElement from './components/StickyElement.js';
import StikcyCanvas from './components/StikcyCanvas.js';

const styled = _styled.default || _styled;

const POSITION_TOP = '40vh';
const SECTION_HEIGHT_NUM = 5;

const ANIMATIONS_INFO = {
  MESSAGE_A: {
    IN: {
      START: 0.1,
      END: 0.2,
      OPACITY: [0, 1] as ValueStartEnd,
      TRANSLATE_Y: [20, 0] as ValueStartEnd,
    },
    OUT: {
      START: 0.25,
      END: 0.3,
      OPACITY: [1, 0] as ValueStartEnd,
      TRANSLATE_Y: [0, -20] as ValueStartEnd,
    },
  },
  MESSAGE_B: {
    IN: {
      START: 0.3,
      END: 0.4,
      OPACITY: [0, 1] as ValueStartEnd,
      TRANSLATE_Y: [20, 0] as ValueStartEnd,
    },
    OUT: {
      START: 0.45,
      END: 0.5,
      OPACITY: [1, 0] as ValueStartEnd,
      TRANSLATE_Y: [0, -20] as ValueStartEnd,
    },
  },
  MESSAGE_C: {
    IN: {
      START: 0.5,
      END: 0.6,
      OPACITY: [0, 1] as ValueStartEnd,
      TRANSLATE_Y: [20, 0] as ValueStartEnd,
    },
    OUT: {
      START: 0.65,
      END: 0.7,
      OPACITY: [1, 0] as ValueStartEnd,
      TRANSLATE_Y: [0, -20] as ValueStartEnd,
    },
  },
  MESSAGE_D: {
    IN: {
      START: 0.7,
      END: 0.8,
      OPACITY: [0, 1] as ValueStartEnd,
      TRANSLATE_Y: [20, 0] as ValueStartEnd,
    },
    OUT: {
      START: 0.85,
      END: 0.9,
      OPACITY: [1, 0] as ValueStartEnd,
      TRANSLATE_Y: [0, -20] as ValueStartEnd,
    },
  },
};
const CANVAS_ANIMATION = {
  START: 0.9,
  END: 1,
  OPACITY: [1, 0] as ValueStartEnd,
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionHeight = useMemo(() => innerHeight * SECTION_HEIGHT_NUM, [innerHeight]);
  const currYOffset = scrollY - (sectionRef.current?.offsetTop ?? 0);
  const scrollRatio = currYOffset / sectionHeight;

  if (canvasRef.current) {
    const canvasContext = canvasRef.current.getContext('2d');
    if (canvasContext) {
      const { width, height } = canvasRef.current;
      const text = `Background Index ${Math.round(scrollRatio * 100)}`;
      const { width: textWidth } = canvasContext.measureText(text);

      canvasContext.clearRect(0, 0, width, height);
      canvasContext.font = '2rem Roboto,Noto Sans Kr';
      canvasContext.fillStyle = 'rgb(99, 99, 99)';
      canvasContext.fillText(text, (width / 2) - (textWidth / 2), 400);
    }
    canvasRef.current.style.opacity = `${calcValueWithScroll(
      createValues(CANVAS_ANIMATION.OPACITY, CANVAS_ANIMATION.START, CANVAS_ANIMATION.END),
      currYOffset,
      sectionHeight,
    )}`;
  }

  const display = sectionHeight < scrollY ? 'none' : undefined;

  const style: CSSProperties = {
    top: POSITION_TOP,
    display,
  };

  const animationMessageA = getAnimation('MESSAGE_A', scrollRatio);
  const animationMessageB = getAnimation('MESSAGE_B', scrollRatio);
  const animationMessageC = getAnimation('MESSAGE_C', scrollRatio);
  const animationMessageD = getAnimation('MESSAGE_D', scrollRatio);

  const styleA: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      createValues(animationMessageA.OPACITY, animationMessageA.START, animationMessageA.END),
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      createValues(animationMessageA.TRANSLATE_Y, animationMessageA.START, animationMessageA.END),
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };

  const styleB: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      createValues(animationMessageB.OPACITY, animationMessageB.START, animationMessageB.END),
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      createValues(animationMessageB.TRANSLATE_Y, animationMessageB.START, animationMessageB.END),
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };
  const styleC: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      createValues(animationMessageC.OPACITY, animationMessageC.START, animationMessageC.END),
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      createValues(animationMessageC.TRANSLATE_Y, animationMessageC.START, animationMessageC.END),
      currYOffset,
      sectionHeight,
    )}%, 0)`,
  };
  const styleD: CSSProperties = {
    ...style,
    opacity: calcValueWithScroll(
      createValues(animationMessageD.OPACITY, animationMessageD.START, animationMessageD.END),
      currYOffset,
      sectionHeight,
    ),
    transform: `translate3D(0, ${calcValueWithScroll(
      createValues(animationMessageD.TRANSLATE_Y, animationMessageD.START, animationMessageD.END),
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
      <StikcyCanvas
        ref={canvasRef}
        style={{ display }}
      />
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
