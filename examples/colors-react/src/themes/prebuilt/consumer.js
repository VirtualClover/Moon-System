import * as universe from '../../foundations/colors';
export const consumerTheme = Object.freeze(
    {
        light: {
            colors: {
                primary: universe.borealis60,
                primaryHover: universe.borealis70,
                link: universe.borealis70,
                background: universe.moonlight0,
                onPrimaryHigh: universe.moonlight0,
            },
            attributes:{
                theme: 'consumer',
                mode: 'light'
            },
        },
        dark: {
            colors: {
                primary: universe.borealis60,
                primaryHover: universe.borealis70,
                link: universe.borealis50,
                background: universe.moonlight100,
                onPrimaryHigh: universe.moonlight0,
            },
            attributes:{
                theme: 'consumer',
                mode: 'dark'
            },

        }
    }
);