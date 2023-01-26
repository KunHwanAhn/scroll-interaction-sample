import React, {
  useMemo, useRef, useEffect, useState,
} from 'react';
import _styled from '@emotion/styled';

import { useScrollContext } from '@/contexts/ScrollContext.js';

import {
  calcValueWithScroll,
  createValues,
} from './utils.js';

import ScrollSection from './components/ScrollSection.js';

const styled = _styled.default || _styled;

const SECTION_HEIGHT_NUM = 5;

const CenterAlignScrollSection = styled(ScrollSection)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TopMessage = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: '0 1rem',
  maxWidth: theme.contentMaxWidth,
  fontSize: '2rem',
  color: '#888888',

  '& strong': {
    color: 'rgb(29, 29, 31)',
  },

  [theme.breakpoints.desktop]: {
    fontSize: '4vw',
  },
}));

const BlendImageCanvas = styled('canvas')(() => ({
  '&.fixed': {
    position: 'fixed',
  },
}));

const BACKGROUND_IMAGE_PATH = [
  '/img/background/bg-1.jpg',
  '/img/background/bg-2.jpg',
];

export default function ScrollSection3() {
  const { innerWidth, innerHeight, scrollY } = useScrollContext();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionHeight = useMemo(() => innerHeight * SECTION_HEIGHT_NUM, [innerHeight]);
  const currYOffset = scrollY - (sectionRef.current?.offsetTop ?? 0);
  const scrollRatio = currYOffset / sectionHeight;

  // canvas animation values
  const [canvasOffsetTop, setCanvasOffsetTop] = useState(canvasRef.current?.width ?? 0);
  const canvasWidth = canvasRef.current?.width ?? 0;
  const canvasHeight = canvasRef.current?.height ?? 0;
  const canvasScaleRatio = useMemo(() => {
    const canvasWidthRatio = innerWidth / canvasWidth;
    const canvasHeightRatio = innerHeight / canvasHeight;

    return canvasWidthRatio <= canvasHeightRatio ? canvasHeightRatio : canvasWidthRatio;
  }, [innerWidth, innerHeight, canvasWidth, canvasHeight]);
  const topOffset = useMemo(() => {
    const offset = (canvasHeight - canvasHeight * canvasScaleRatio) * 0.25;

    return Number.isNaN(offset) ? 0 : offset;
  }, [canvasHeight, canvasScaleRatio]);
  const [canvasRectAnimationStart, canvasRectAnimationEnd] = useMemo(() => [
    (innerHeight / 2) / sectionHeight,
    (canvasOffsetTop + topOffset) / sectionHeight,
  ], [
    innerHeight, sectionHeight, topOffset, canvasOffsetTop,
  ]);
  const recalculatedInnerWidth = innerWidth / canvasScaleRatio;
  const whiteRectWidth = recalculatedInnerWidth * 0.15;
  const leftRectValues = useMemo(() => {
    const valueStart = (canvasWidth - recalculatedInnerWidth) / 2;

    return createValues(
      [valueStart, valueStart - whiteRectWidth],
      canvasRectAnimationStart,
      canvasRectAnimationEnd,
    );
  }, [canvasWidth, recalculatedInnerWidth, whiteRectWidth, canvasRectAnimationStart, canvasRectAnimationEnd]);
  const rightRectValues = useMemo(() => {
    const valueStart = leftRectValues[0] + recalculatedInnerWidth - whiteRectWidth;

    return createValues(
      [valueStart, valueStart + whiteRectWidth],
      canvasRectAnimationStart,
      canvasRectAnimationEnd,
    );
  }, [leftRectValues, recalculatedInnerWidth, whiteRectWidth, canvasRectAnimationStart, canvasRectAnimationEnd]);
  const blendImageHeight = useMemo(() => createValues(
    [0, canvasHeight],
    canvasRectAnimationEnd,
    canvasRectAnimationEnd + 0.2,
  ), [canvasHeight, canvasRectAnimationEnd]);
  const canvasScale = useMemo(() => createValues(
    [canvasScaleRatio, innerWidth / (canvasWidth * 1.5)],
    blendImageHeight[2].end,
    blendImageHeight[2].end + 0.2,
  ), [canvasScaleRatio, innerWidth, canvasWidth, blendImageHeight]);

  useEffect(() => { setCanvasOffsetTop(() => canvasRef.current?.offsetTop ?? 0); }, [innerWidth, innerHeight]);
  useEffect(() => {
    function loadImage([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) {
      if (entry.isIntersecting && sectionRef.current) {
        setImages(() => BACKGROUND_IMAGE_PATH.map((path) => {
          const imageElem = new Image();
          imageElem.src = path;
          imageElem.addEventListener('load', () => { setImageLoaded(() => true); });

          return imageElem;
        }));
        observer.unobserve(sectionRef.current);
      }
    }

    const observer = new IntersectionObserver(loadImage, { rootMargin: '200px' });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => { observer.disconnect(); };
  }, []);

  if (canvasRef.current && imageLoaded) {
    const canvasContext = canvasRef.current.getContext('2d');
    if (canvasContext) {
      canvasRef.current.style.transformOrigin = 'center 25%';
      canvasRef.current.style.transform = `scale(${canvasScaleRatio})`;

      // NOTE: 기본 이미지
      canvasContext.drawImage(images[0], 0, 0);
      canvasContext.fillStyle = 'white';

      // NOTE: 기본 이미지의 좌우 옆 사각형
      canvasContext.fillRect(
        calcValueWithScroll(leftRectValues, currYOffset, sectionHeight),
        0,
        whiteRectWidth,
        canvasHeight,
      );
      canvasContext.fillRect(
        calcValueWithScroll(rightRectValues, currYOffset, sectionHeight),
        0,
        whiteRectWidth,
        canvasHeight,
      );

      const currBlendImageHeight = calcValueWithScroll(blendImageHeight, currYOffset, sectionHeight);

      // NOTE: Blend 이미지
      canvasContext.drawImage(
        images[1],
        0, // sx
        canvasHeight - currBlendImageHeight, // sy
        canvasWidth, // sdw
        currBlendImageHeight, // sdy,
        0, // dx
        canvasHeight - currBlendImageHeight, // dy,
        canvasWidth,
        currBlendImageHeight,
      );

      if (scrollRatio > canvasScale[2].start) {
        canvasRef.current.style.transform = `scale(${calcValueWithScroll(canvasScale, currYOffset, sectionHeight)})`;
      }
    }
  }

  let fixedClass = '';
  if (scrollRatio > canvasRectAnimationEnd && scrollRatio < canvasScale[2].end) {
    fixedClass = 'fixed';
  }

  let marginTop;
  if (scrollRatio >= canvasScale[2].end) {
    // marginTop = `${(sectionHeight * canvasScale[2].start) + topOffset}px`;
    marginTop = `${sectionHeight * 0.4}px`;
  }

  return (
    <CenterAlignScrollSection
      ref={sectionRef}
      type="sticky"
      heightNum={SECTION_HEIGHT_NUM}
    >
      <TopMessage>
        <strong>Blend Image</strong>
        <br />
        {/* eslint-disable-next-line max-len */}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </TopMessage>
      <BlendImageCanvas
        ref={canvasRef}
        className={`${fixedClass}`}
        width="1920"
        height="1080"
        style={{
          top: -topOffset,
          marginTop,
        }}
      />
      <div>
        {/* eslint-disable-next-line max-len */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cupiditate similique dolore. Eligendi harum voluptatibus vero esse minima tempora recusandae enim a blanditiis necessitatibus quaerat laborum ab illo quasi amet dolor est aut beatae minus, voluptate consequuntur adipisci nihil. Inventore libero laboriosam, ratione doloremque aut et, quidem voluptatibus tempore id in placeat qui debitis quo esse cupiditate, fugit mollitia sunt fuga. Vitae atque, magnam possimus culpa omnis repudiandae quas, asperiores voluptate quisquam, ipsam illum recusandae praesentium aperiam laudantium quae tempora. Exercitationem tempore aperiam amet repellat provident quisquam magnam doloremque mollitia nobis, beatae eaque cum, deleniti esse a minima. Accusantium dignissimos, molestias tenetur ratione incidunt sunt. Assumenda reiciendis, minus eius reprehenderit soluta amet quibusdam totam tempora alias corporis sint nulla dolor facere inventore, ut pariatur quia hic? Laboriosam reiciendis quia suscipit inventore ducimus quo quisquam voluptatem optio accusamus. Vel ipsum odio, quis suscipit voluptatum architecto assumenda adipisci et. Est nam cumque blanditiis unde eveniet, beatae repudiandae officiis quas molestias, minima ipsa non libero rerum ex? Possimus modi autem ipsa ea, non qui et vel. Deleniti esse magnam at ullam enim accusantium mollitia excepturi similique dolore cumque? Possimus laboriosam atque cupiditate recusandae culpa quasi ducimus nostrum nihil. Illo, nulla! Hic, magni consequuntur.
      </div>
    </CenterAlignScrollSection>
  );
}
