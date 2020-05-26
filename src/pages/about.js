import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MetaTags } from "../components/MetaTags"

export default function About({ data }) {
  return (
    <Layout>
      <MetaTags title={`About ${data.site.siteMetadata.title}`} />
      <h1>{data.site.siteMetadata.title}</h1>
      <p>An anecdotal site filled with notes.</p>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
