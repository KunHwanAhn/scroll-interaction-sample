export type ScrollValues = [number, number, { start: number, end: number }];

export const calcValueWithScroll = (values: ScrollValues, currYOffset: number, sectionHeight: number): number => {
  const [valueStart, valueEnd, { start: rangeStart, end: rangeEnd }] = values;
  let result = 0;

  const animationStart = rangeStart * sectionHeight;
  const animationEnd = rangeEnd * sectionHeight;
  const animationHeight = animationEnd - animationStart;

  if (currYOffset >= animationStart && currYOffset <= animationEnd) {
    result = ((currYOffset - animationStart) / animationHeight) * (valueEnd - valueStart) + valueStart;
  } else if (currYOffset < animationStart) {
    result = valueStart;
  } else if (currYOffset > animationEnd) {
    result = valueEnd;
  }

  return result;
};
