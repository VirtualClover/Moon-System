import { createContext } from "react";
import { themes } from "../prebuilt";


export const ThemeContext = createContext();

export const MSThemeProvider = (props) => {
    return (
        <ThemeContext.Provider value={{ theme: { name: props.theme, mode: props.mode, values: themes[`${props.theme}Theme`] } }}>
            {props.children}
        </ThemeContext.Provider>
    );
};