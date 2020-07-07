import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Arrow = ({ style = {} }) => (
  <svg
    width="1.6rem"
    height="1.6rem"
    viewBox="0 0 16 16"
    className="bi bi-arrow-bar-right"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      marginBottom: '-0.5rem',
      ...style,
    }}
  >
    <path
      fillRule="evenodd"
      d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"
    />
    <path
      fillRule="evenodd"
      d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"
    />
  </svg>
);

const PostLink = styled(Link)`
  display: block;
  padding: 0.6rem 1rem;
  color: #3a3a3a;
  font-size: 1rem;
`;

const FooterWrapper = styled.aside`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8rem;
  flex-direction: row-reverse;
`;

const PostFooter = ({ prev, next }) => (
  <FooterWrapper>
    {next && (
      <PostLink to={next.slug}>
        {next.title}
        <Arrow
          style={{
            marginLeft: '0.4rem',
          }}
        />
      </PostLink>
    )}
    {prev && (
      <PostLink to={prev.slug}>
        <Arrow
          style={{
            marginRight: '0.4rem',
            transform: 'rotate(180deg)',
          }}
        />
        {prev.title}
      </PostLink>
    )}
  </FooterWrapper>
);

export default PostFooter;
