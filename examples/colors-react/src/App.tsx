import React, { ReactNode } from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { themes } from './themes';
const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  padding: 12px 32px;
  border-radius: 50px;
  color: ${(props) => props.theme.colors.onPrimaryHigh};
  border: none;
`;

const Wrapper = (props: any) => (
  <div className={props.className}>{props.children}</div>
);

const StyledWrapper = styled(Wrapper)`
  background: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProviderProps {
  theme?: string;
  mode?: string;
  children: ReactNode;
}

const MSThemeProvider = (props: ProviderProps) => {
  return (
    <ThemeProvider
      theme={
        themes[`${props.theme}Theme` as keyof typeof themes][
          props.mode ? props.mode : 'light'
        ]
      }
    >
      {props.children}
    </ThemeProvider>
  );
};

interface InverterProps {
  theme?: MSMode;
  children: ReactNode;
}

const BaseThemeInverter = (props: any) => {
  return (
    <MSThemeProvider theme={props.theme.theme} mode={props.theme.mode === 'dark' ? 'light' : 'dark'}>
      {props.children}
    </MSThemeProvider>
  );
};

const MSThemeInverter = styled(BaseThemeInverter).attrs((props) => ({
  theme: props.theme.attributes,
}))``;

function App() {
  return (
    <MSThemeProvider theme={'consumer'} mode={'dark'}>
      <StyledWrapper>
        <Button>Themed</Button>
      </StyledWrapper>
      <MSThemeInverter>
        <StyledWrapper>
          <Button>Themed</Button>
        </StyledWrapper>
      </MSThemeInverter>
    </MSThemeProvider>
  );
}
export default App;
