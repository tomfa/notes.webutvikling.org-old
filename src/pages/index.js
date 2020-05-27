import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import { MetaTags } from "../components/MetaTags"
import { usePostQuery } from "../hooks/use-posts"
import { PostResult } from "../components/PostResult"

const PostList = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-flow: row wrap;
`

export default function Home() {
  const data = usePostQuery()

  return (
    <div>
      <MetaTags />

      <Layout wide>
        <h4>{data.totalCount} Posts</h4>

        <PostList>
          {data.edges.map(({ node }) => (
            <PostResult post={node} key={node.id} />
          ))}
        </PostList>
      </Layout>
    </div>
  )
}
