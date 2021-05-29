import styled from 'styled-components';
import GatsbyImage from 'gatsby-image';

export const Image = styled(GatsbyImage)`
  max-width: 100%;
`;

export const ImageCredit = styled.span`
  display: block;
  text-align: center;
  opacity: 0.5;
  margin-top: 0.5rem;
`;
