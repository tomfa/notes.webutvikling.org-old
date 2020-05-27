import React from "react"
import { graphql } from "gatsby"
import YouTubePlayer from "react-youtube"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import PostHero from "../components/PostHero"

const YouTube = props => (
  <YouTubePlayer
    className="video"
    containerClassName="video-container"
    {...props}
  />
)

const shortcodes = { Link, YouTube }

export default function PageTemplate({ data: { mdx } }) {
  return (
    <Layout>
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
      body
      frontmatter {
        title
        image {
          publicURL
        }
        imageAlt
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`
