import React from "react"
import { graphql } from "gatsby"
import YouTubePlayer from "react-youtube"
import ReactPlayer from "react-player"
import styled from "styled-components"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import PostHero from "../components/PostHero"
import { MetaTags } from "../components/MetaTags"

const VideoContainer = styled.div`
  max-width: 100%;
  background-color: #000000;
  margin: 0.3rem 0;
`

const YouTube = props => (
  <YouTubePlayer
    className="video"
    containerClassName="video-container"
    {...props}
  />
)

const Video = props => (
  <ReactPlayer {...props} controls={true} wrapper={VideoContainer} />
)

const shortcodes = { Link, YouTube, Video }

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout>
      <MetaTags title={mdx.frontmatter.title} keywords={mdx.frontmatter.tags} />
      <PostHero {...mdx.frontmatter} />
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        eImage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageAlt
        tags
        title
      }
    }
  }
`
