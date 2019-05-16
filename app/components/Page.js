import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const StyledPage = styled.div`
  background: white;
  color: #111111;
`;

const InnerSection = styled.div`
  max-width: 1200;
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;