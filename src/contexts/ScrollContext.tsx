import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';

const BASE_HEIGHT = 1080;

type ScrollContextType = {
  scrollY: number;
  innerWidth: number;
  innerHeight: number;
  heightRatio: number;
};

const ScrollContext = createContext<ScrollContextType>({
  scrollY: window.scrollY,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  heightRatio: window.innerHeight / BASE_HEIGHT,
});

export function ScrollContextProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(document.body.offsetWidth);
  const heightRatio = useMemo(() => innerHeight / BASE_HEIGHT, [innerHeight]);

  // 스크롤 이벤트
  useEffect(() => {
    const updateScrollY = () => { setScrollY(() => window.scrollY); };
    window.addEventListener('scroll', updateScrollY);
    return () => { window.removeEventListener('scroll', updateScrollY); };
  }, []);

  // 리사이즈 이벤트
  useEffect(() => {
    const updateInnerHeight = () => {
      setInnerWidth(() => document.body.offsetWidth);
      setInnerHeight(() => window.innerHeight);
    };
    window.addEventListener('load', updateInnerHeight);
    window.addEventListener('resize', updateInnerHeight);
    window.addEventListener('orientationchange', updateInnerHeight);
    return () => {
      window.removeEventListener('load', updateInnerHeight);
      window.removeEventListener('resize', updateInnerHeight);
      window.removeEventListener('orientationchange', updateInnerHeight);
    };
  }, []);

  const contextValue: ScrollContextType = useMemo(() => ({
    scrollY,
    innerWidth,
    innerHeight,
    heightRatio,
  }), [scrollY, innerWidth, innerHeight, heightRatio]);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
