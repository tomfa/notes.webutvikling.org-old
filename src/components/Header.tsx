import React from 'react';
import styled from 'styled-components';

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 800px) {
    margin-bottom: 1rem;
  }
`;
