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

const MESSAGE_KEYS: Messages[] = [
  'MESSAGE_A', 'MESSAGE_B', 'MESSAGE_C', 'MESSAGE_D',
];
const MESSAGE_TEXT_MAP: { [key in Messages]: string } = {
  MESSAGE_A: 'SubTitle 1',
  MESSAGE_B: 'SubTitle 2',
  MESSAGE_C: 'SubTitle 3',
  MESSAGE_D: 'SubTitle 4',
};
export default function ScrollSection1() {
  const { innerHeight, scrollY } = useScrollContext();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionHeight = useMemo(() => innerHeight * SECTION_HEIGHT_NUM, [innerHeight]);
  const currYOffset = scrollY - (sectionRef.current?.offsetTop ?? 0);
  const scrollRatio = useMemo(() => currYOffset / sectionHeight, [currYOffset, sectionHeight]);

  if (canvasRef.current) {
    const canvasContext = canvasRef.current.getContext('2d');
    if (canvasContext) {
      const { width, height } = canvasRef.current;
      const text = `Background Index ${Math.round(scrollRatio * 100)}`;
      const { width: textWidth } = canvasContext.measureText(text);

      canvasContext.clearRect(0, 0, width, height);
      canvasContext.font = '2rem Roboto,Noto Sans KR';
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

  const stickyElements = MESSAGE_KEYS.map((key) => {
    const messageAnimation = getAnimation(key, scrollRatio);
    const messageStyle: CSSProperties = {
      display,
      top: POSITION_TOP,
      opacity: calcValueWithScroll(
        createValues(messageAnimation.OPACITY, messageAnimation.START, messageAnimation.END),
        currYOffset,
        sectionHeight,
      ),
      transform: `translate3D(0, ${calcValueWithScroll(
        createValues(messageAnimation.TRANSLATE_Y, messageAnimation.START, messageAnimation.END),
        currYOffset,
        sectionHeight,
      )}%, 0)`,
    };

    return {
      key,
      text: MESSAGE_TEXT_MAP[key],
      style: messageStyle,
    };
  });

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
      {stickyElements.map(({ key, text, style }) => (
        <StickyElement
          key={`section1-${key}`}
          style={style}
        >
          <SubTitle>{text}</SubTitle>
        </StickyElement>
      ))}
    </ScrollSection>
  );
}
