import React from 'react';
import styled from 'styled-components';

import { Footer } from './Footer';
import { Navigation } from './Navigation';

import 'normalize.css';
import './style.css';

const Main = styled.main`
  max-width: ${props => (!props.wide ? '40rem' : null)};
  margin: 0 auto;
  padding-bottom: 2rem;

  @media (max-width: 800px) {
    & > p,
    & > h1,
    & > h2,
    & > h3,
    & > h4,
    & > small {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  
  @media (min-width: 800px) {
    max-width: ${props => (!props.wide ? '50rem' : '100rem')};
  }
`;
const SiteWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

export default function Layout({ children, wide = false }) {
  return (
    <SiteWrapper>
      <Main wide={wide}>{children}</Main>
      <Footer />
    </SiteWrapper>
  );
}
