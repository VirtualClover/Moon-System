import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { MSThemeInverter, MSThemeProvider } from './themes';
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
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: 50vh;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  max-width: ${(props) => props.maxWidth};
`;

const StyledTitle = styled('h1')`
  line-height: 24px;
  color: ${(props) => props.theme.colors.onBackgroundHigh};
  margin: 0;
  width: 100%;
`;

const StyledSubTitle = styled('h4')`
  line-height: 24px;
  color: ${(props) => props.theme.colors.onBackgroundMid};
  margin: 20px 0;
  width: 100%;
`;

const StyledParagraph = styled('p')`
  color: ${(props) => props.theme.colors.onBackgroundLow};
  margin: 0;
  width: 100%;
`;

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  return (
    <MSThemeProvider theme={'consumer'} mode={mode}>
      <StyledWrapper>
        <StyledWrapper>
          <StyledWrapper
            flexDirection={'column'}
            margin={'0 200px 0 0'}
            maxWidth={'800px'}
          >
            <StyledTitle>Consumer Theme</StyledTitle>
            <StyledSubTitle>Using the mode from the provider</StyledSubTitle>
            <StyledParagraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </StyledParagraph>
          </StyledWrapper>
          <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            Switch
          </Button>
        </StyledWrapper>
      </StyledWrapper>
      <MSThemeInverter>
        <StyledWrapper>
          <StyledWrapper>
            <StyledWrapper
              flexDirection={'column'}
              margin={'0 200px 0 0'}
              maxWidth={'800px'}
            >
              <StyledTitle>Consumer Theme</StyledTitle>
              <StyledSubTitle>With an inverter component</StyledSubTitle>
              <StyledParagraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </StyledParagraph>
            </StyledWrapper>
            <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Switch</Button>
          </StyledWrapper>
        </StyledWrapper>
      </MSThemeInverter>
    </MSThemeProvider>
  );
}
export default App;
