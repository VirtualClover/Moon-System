import React from "react";

interface MSThemeProviderProps {
  theme: string;
  mode: 'light' | 'dark';
  children: ReactNode;
}
/**
 * Theme provider of the moon system, it takes a moon theme and its mode
 * @param {string} theme a theme from the Moon System
 *  @param {string} mode light or dark
 * @returns 
 */
export const MSThemeProvider: React.FunctionComponent<MSThemeProviderProps>;

//  as keyof typeof themes
