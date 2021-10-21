import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { asUrl } from '../utils/urlize';

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 0.1rem 0.5rem;
  margin: 0 0.3rem 0.3rem 0;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.3rem;
  text-transform: lowercase;

  & > a {
    color: inherit;
  }
  @media (min-width: 800px) {
    &:not(:hover) > a {
      text-decoration: none;
    }
  }
`;

const tagStyles = {
  default: { bgColor: '#3a3a3a', color: 'white' },
  // category
  book: { bgColor: '#2C5C89', color: 'white' },
  guide: { bgColor: '#2C5C89', color: 'white' },
  talk: { bgColor: '#2C5C89', color: 'white' },
  statement: { bgColor: '#2C5C89', color: 'white' },
  debugging: { bgColor: '#2C5C89', color: 'white' },
  tools: { bgColor: '#2C5C89', color: 'white' },
  idea: { bgColor: '#2C5C89', color: 'white' },

  // topics
  management: { bgColor: '#aa0a1c', color: 'white' },
  efficiency: { bgColor: '#aa0a1c', color: 'white' },
  monitoring: { bgColor: '#aa0a1c', color: 'white' },
  startup: { bgColor: '#aa0a1c', color: 'white' },
  security: { bgColor: '#aa0a1c', color: 'white' },
  'code quality': { bgColor: '#aa0a1c', color: 'white' },

  // languages
  javascript: { bgColor: '#3e953b', color: 'white' },
  svg: { bgColor: '#3e953b', color: 'white' },
  css: { bgColor: '#3e953b', color: 'white' },
  bash: { bgColor: '#3e953b', color: 'white' },
  python: { bgColor: '#3e953b', color: 'white' },
  node: { bgColor: '#3e953b', color: 'white' },
  react: { bgColor: '#3e953b', color: 'white' },
  graphql: { bgColor: '#3e953b', color: 'white' },
  serverless: { bgColor: '#3e953b', color: 'white' },
  git: { bgColor: '#3e953b', color: 'white' },

  // platforms
  github: { bgColor: '#E4B81B', color: 'white' },
  heroku: { bgColor: '#E4B81B', color: 'white' },
  aws: { bgColor: '#E4B81B', color: 'white' },
  'google cloud platform': { bgColor: '#E4B81B', color: 'white' },

  // // services
  // "google maps": { bgColor: "#E4B81B", color: "white" },
  // cloudfront: { bgColor: "#E4B81B", color: "white" },
  // s3: { bgColor: "#E4B81B", color: "white" },
  //
  // // libraries
  // django: { bgColor: "#E4B81B", color: "white" },
  // react: { bgColor: "#E4B81B", color: "white" },
  // gatsby: { bgColor: "#E4B81B", color: "white" },
  //
  // // tools
  // slack: { bgColor: "#E4B81B", color: "white" },
  // serverless: { bgColor: "#E4B81B", color: "white" },
  // git: { bgColor: "#E4B81B", color: "white" },
  // typing: { bgColor: "#E4B81B", color: "white" },
};
const getTagStyle = tag => {
  return tagStyles[tag.toLowerCase()] || tagStyles.default;
};

const Tags = styled.div`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  margin-left: ${props => (props.inline ? '1rem' : '')};
`;

export const PostTag = ({ children, tagUrl, style = undefined }) => (
  <Tag {...getTagStyle(children)} style={style}>
    {(tagUrl && <Link to={`/tag/${tagUrl}`}>{children}</Link>) || children}
  </Tag>
);
export const PostTags = ({ tags, useLink = false, inline = false }) =>
  tags && (
    <Tags inline={inline}>
      {tags.map(tag => (
        <PostTag tagUrl={useLink && asUrl(tag)} key={tag}>
          {tag}
        </PostTag>
      ))}
    </Tags>
  );
