import React from "react"
import { graphql } from "gatsby"
import YouTube from "react-youtube"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"

const shortcodes = { Link, YouTube }

export default function PageTemplate({ data: { mdx } }) {
  const { date, title, image, imageAlt } = mdx.frontmatter
  return (
    <Layout>
      {image && <img src={image.publicURL} alt={imageAlt} />}
      <h1>{title}</h1>
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
        date
      }
    }
  }
`
