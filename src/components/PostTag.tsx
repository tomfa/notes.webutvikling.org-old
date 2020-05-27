import React from "react"
import styled from "styled-components"
import { asUrl } from "../utils/urlize"

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 0.1rem 0.5rem;
  margin-right: 0.3rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.3rem;

  & > a {
    color: inherit;
  }
  @media (min-width: 800px) {
    &:not(:hover) > a {
      text-decoration: none;
    }
  }
`

const tagStyles = {
  default: { bgColor: "#3a3a3a", color: "white" },
  // topic
  mobile: { bgColor: "#2C5C89", color: "white" },

  // languages
  javascript: { bgColor: "#2C5C89", color: "white" },
  svg: { bgColor: "#2C5C89", color: "white" },
  css: { bgColor: "#2C5C89", color: "white" },
  bash: { bgColor: "#2C5C89", color: "white" },
  python: { bgColor: "#2C5C89", color: "white" },

  // platforms
  github: { bgColor: "#BF4216", color: "white" },
  heroku: { bgColor: "#BF4216", color: "white" },
  aws: { bgColor: "#BF4216", color: "white" },

  // services
  "google maps": { bgColor: "#E4B81B", color: "black" },
  cloudfront: { bgColor: "#E4B81B", color: "black" },
  s3: { bgColor: "#E4B81B", color: "black" },
  node: { bgColor: "#E4B81B", color: "black" },

  // libraries
  django: { bgColor: "#E4B81B", color: "black" },
  react: { bgColor: "#E4B81B", color: "black" },
  gatsby: { bgColor: "#E4B81B", color: "black" },

  // tools
  slack: { bgColor: "#FF8A00", color: "white" },
  serverless: { bgColor: "#FF8A00", color: "white" },
  git: { bgColor: "#FF8A00", color: "white" },
  typing: { bgColor: "#FF8A00", color: "white" },

  // people
  meetup: { bgColor: "#6C9BD1", color: "white" },
  workshop: { bgColor: "#6C9BD1", color: "white" },
  talk: { bgColor: "#6C9BD1", color: "white" },
  culture: { bgColor: "#6C9BD1", color: "white" },
}
const getTagStyle = tag => {
  return tagStyles[tag] || tagStyles["default"]
}

const Tags = styled.div`
  display: ${props => (props.inline ? "inline-block" : "block")};
  margin-left: ${props => (props.inline ? "1rem" : "")};
`

export const PostTag = ({ children, tagUrl }) => (
  <Tag {...getTagStyle(children)}>
    {(tagUrl && <a href={`/tag/${tagUrl}`}>{children}</a>) || children}
  </Tag>
)
export const PostTags = ({ tags, useLink = false, inline = false }) =>
  tags && (
    <Tags inline={inline}>
      {tags.map(tag => (
        <PostTag tagUrl={useLink && asUrl(tag)} key={tag}>
          {tag}
        </PostTag>
      ))}
    </Tags>
  )
