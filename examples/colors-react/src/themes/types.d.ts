interface MSModeAttributes {
  theme: string;
  mode: 'light' | 'dark';
}

interface MSMode {
  colors: any;
  attributes: MSModeAttributes
}

interface MSTheme {
  light: MSMode;
  dark: MSMode;
}
