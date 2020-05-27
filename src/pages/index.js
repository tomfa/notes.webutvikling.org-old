import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import { MetaTags } from "../components/MetaTags"
import { usePostQuery } from "../hooks/use-posts"
import { PostResult } from "../components/PostResult"
import { useMeta } from "../hooks/use-meta"

const PostList = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  flex-flow: row wrap;
`

const Intro = styled.div`
  max-width: 40rem;
  margin: 0 auto;
`

export default function Home() {
  const data = usePostQuery()
  const { title } = useMeta()

  return (
    <div>
      <MetaTags />

      <Layout wide>
        <Intro>
          <h1>{title}</h1>
          <h4>{data.totalCount} Posts</h4>
        </Intro>
        <PostList>
          {data.edges.map(({ node }) => (
            <PostResult post={node} key={node.id} />
          ))}
        </PostList>
      </Layout>
    </div>
  )
}
