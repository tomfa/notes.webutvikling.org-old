import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Image } from "./Image"
import { PostTags } from "./PostTag"

const Article = styled.article`
  margin: 0.8rem;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 7px 7px 20px #dedbdb, -7px -7px 20px #f3f2f2;
  flex-basis: 100vw;
  align-self: flex-start;
  border-bottom: 3px solid transparent;
  margin-bottom: 0.5rem;

  & > a {
    text-decoration: none;
    color: #333333;

    & > .gatsby-image-wrapper {
      height: 250px;
    }
  }

  @media (min-width: 800px) {
    margin: 2rem;
    flex-basis: 30rem;
    flex-shrink: 1;
    flex-grow: 5;
    margin: 0.7rem;
    border-width: 3px;
    background-color: #fff;
    border-color: #dedede;

    &:hover {
      border-color: #6f8eff;
    }
  }
`

const ArticleText = styled.div`
  margin: 2rem;
`

const PostImage = styled(Image)`
  position: relative;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-bottom: -1rem;
`

const PostHeader = styled.h2`
  font-weight: normal;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 0.8rem;
  margin-top: 3.6rem;
`

const PostHeaderDate = styled.span`
  font-size: 1rem;
  color: #888;
`

const PostExcerpt = styled.p`
  text-decoration: underline;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`

export const PostResult = ({ post }) => {
  const { eImage, image, title, date, imageAlt, tags } = post.frontmatter
  const img = image || eImage

  return (
    <Article>
      <Link to={post.fields.slug}>
        {img && <PostImage fluid={img.childImageSharp.fluid} alt={imageAlt} />}
        <ArticleText>
          <PostHeader>{title}</PostHeader>
          <PostHeaderDate>{date}</PostHeaderDate>
          <PostTags tags={tags} />
          <PostExcerpt>{post.excerpt}</PostExcerpt>
        </ArticleText>
      </Link>
    </Article>
  )
}
