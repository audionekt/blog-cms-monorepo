// Extend styled-components DefaultTheme with our ThemeType
// This enables autocomplete for the theme prop in all styled components

import 'styled-components';
import type { ThemeType } from './index';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

