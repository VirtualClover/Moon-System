import styled from "styled-components";
import { MSThemeProvider } from "../MSThemeProvider";
import { themes } from '../prebuilt';

const BaseComponent = (props) => {
    return (
        <MSThemeProvider theme={props.theme.theme} mode={props.theme.mode === 'dark' ? 'light' : 'dark'}>
            {props.children}
        </MSThemeProvider>
    );
};

/**
 * Inverts the mode of a theme, this component should be nested inside a MSThemeProvider
 */
export const MSThemeInverter = styled(BaseComponent).attrs((props) => ({
    theme: props.theme.attributes,
}))``;

MSThemeInverter.defaultProps = {
    theme: themes.consumerTheme.light
};