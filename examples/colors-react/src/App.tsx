import React from 'react';
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
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <MSThemeProvider theme={'consumer'} mode={'light'}>
      <StyledWrapper>
        <Button>Light</Button>
      </StyledWrapper>
      <MSThemeInverter>
        <StyledWrapper>
          <Button>Dark</Button>
        </StyledWrapper>
        </MSThemeInverter>
    </MSThemeProvider>
  );
}
export default App;