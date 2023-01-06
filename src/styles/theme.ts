import { Theme } from '@emotion/react';

const lightTheme: Theme = {
  breakpoints: {
    mobile: '@media (max-width: 960px)',
    desktop: '@media (min-width: 961px)',
  },
  contentMaxWidth: '1024px',
  spacing: (size, unit = 'rem') => `${size}${unit}`,
};

// eslint-disable-next-line import/prefer-default-export
export { lightTheme };
