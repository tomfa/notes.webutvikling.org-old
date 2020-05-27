import React from "react"
import styled from "styled-components"

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 0.1rem 0.5rem;
  margin-right: 0.3rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.3rem;
`

const tagStyles = {
  default: { bgColor: "#3a3a3a", color: "white" },
  // topic
  mobile: { bgColor: "rgb(0, 64, 53)", color: "white" },

  // languages
  javascript: { bgColor: "rgb(0, 64, 53)", color: "white" },
  svg: { bgColor: "rgb(0, 64, 53)", color: "white" },
  css: { bgColor: "rgb(0, 64, 53)", color: "white" },
  bash: { bgColor: "rgb(0, 64, 53)", color: "white" },
  python: { bgColor: "rgb(0, 64, 53)", color: "white" },

  // platforms
  github: { bgColor: "rgb(166, 106, 30)", color: "white" },
  heroku: { bgColor: "rgb(166, 106, 30)", color: "white" },
  aws: { bgColor: "rgb(166, 106, 30)", color: "white" },

  // services
  "google maps": { bgColor: "rgb(225, 196, 133)", color: "black" },
  cloudfront: { bgColor: "rgb(225, 196, 133)", color: "black" },
  s3: { bgColor: "rgb(225, 196, 133)", color: "black" },
  node: { bgColor: "rgb(225, 196, 133)", color: "black" },

  // libraries
  django: { bgColor: "rgb(225, 196, 133)", color: "black" },
  react: { bgColor: "rgb(225, 196, 133)", color: "black" },
  gatsby: { bgColor: "rgb(225, 196, 133)", color: "black" },

  // tools
  slack: { bgColor: "rgb(40, 137, 129)", color: "white" },
  serverless: { bgColor: "rgb(40, 137, 129)", color: "white" },
  git: { bgColor: "rgb(40, 137, 129)", color: "white" },
  typing: { bgColor: "rgb(40, 137, 129)", color: "white" },

  // people
  meetup: { bgColor: "rgb(222, 239, 236)", color: "black" },
  workshop: { bgColor: "rgb(222, 239, 236)", color: "black" },
  talk: { bgColor: "rgb(222, 239, 236)", color: "black" },
  culture: { bgColor: "rgb(222, 239, 236)", color: "black" },
}
const getTagStyle = tag => {
  return tagStyles[tag] || tagStyles["default"]
}

const Tags = styled.div`
  display: block;
`

export const PostTag = ({ children }) => (
  <Tag {...getTagStyle(children)}>{children}</Tag>
)
export const PostTags = ({ tags }) =>
  tags && (
    <Tags>
      {tags.map(tag => (
        <PostTag>{tag}</PostTag>
      ))}
    </Tags>
  )
