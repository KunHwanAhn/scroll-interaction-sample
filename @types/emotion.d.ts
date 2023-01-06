import '@emotion/react';

declare module '@emotion/react' {
  type SpacingUnit = 'px' | 'rem' | 'em';

  export interface Theme {
    breakpoints: {
      mobile: string;
      desktop: string;
    };
    contentMaxWidth: string;
    spacing: (size: number, unit: SpacingUnit = 'rem') => string;
  }
}
