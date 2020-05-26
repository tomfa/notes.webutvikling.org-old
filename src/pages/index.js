import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { MetaTags } from "../components/MetaTags"
import { usePostQuery } from "../hooks/use-posts"

export default function Home() {
  const data = usePostQuery()

  return (
    <Layout>
      <div>
        <MetaTags />
        <h4>{data.totalCount} Posts</h4>
        {data.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
