import React from "react";

interface MSThemeInverterProps {
    theme?: MSTheme
  }

  /**
 * Inverts the mode of a theme, this component should be nested inside a MSThemeProvider
 */
  export const MSThemeInverter : React.FunctionComponent<MSThemeInverterProps>;