import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Image } from "./Image"

const Article = styled.article`
  width: 40rem;
  background-color: #ececec;
  align-self: flex-start;
  border-bottom: 3px solid transparent;
  margin-bottom: 0.5rem;

  & > a {
    text-decoration: none;
    color: #333333;
  }

  @media (min-width: 1200px) {
    margin: 0.5rem;

    transition: background-color 0.3s;
    &:hover {
      background-color: #f6f6f6;
      border-color: #6f8eff;
    }
  }
`

const ArticleText = styled.div`
  margin: 2rem;
`

const PostImage = styled(Image)`
  margin-bottom: -1rem;
`

const PostHeader = styled.h2`
  font-weight: normal;
  font-size: 2rem;
  margin: 0;
`

const PostHeaderDate = styled.span`
  font-size: 1rem;
  color: #888;
`

const PostExcerpt = styled.p`
  text-decoration: underline;
  margin-bottom: 1rm;

  @media (min-width: 1200px) {
    text-decoration: none;
  }
`

export const PostResult = ({ post }) => {
  const { image, title, date, imageAlt } = post.frontmatter
  return (
    <Article>
      <Link to={post.fields.slug}>
        {image && <PostImage src={image.publicURL} alt={imageAlt} />}
        <ArticleText>
          <PostHeader>{title}</PostHeader>
          <PostHeaderDate>{date}</PostHeaderDate>
          <PostExcerpt>{post.excerpt}</PostExcerpt>
        </ArticleText>
      </Link>
    </Article>
  )
}
