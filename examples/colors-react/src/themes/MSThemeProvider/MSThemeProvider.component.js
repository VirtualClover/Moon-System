import { ThemeProvider } from 'styled-components';
import { themes } from '../prebuilt';

/**
 * Theme provider of the moon system, it takes a moon theme and its mode
 * @param {string} theme a theme from the Moon System
 *  @param {string} mode light or dark
 * @returns 
 */
export const MSThemeProvider = (props) => {
    return (
        <ThemeProvider
            theme={
                themes[`${props.theme}Theme`][props.mode]
            }
        >
            {props.children}
        </ThemeProvider>
    );
};

MSThemeProvider.defaultProps = {
    theme: 'consumer',
    mode: 'light'
};