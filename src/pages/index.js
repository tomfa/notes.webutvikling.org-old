import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { MetaTags } from '../components/MetaTags';
import { usePostQuery } from '../hooks/use-posts';
import { PostResult } from '../components/PostResult';
import { PostList } from '../components/PostList';
import { useMeta } from '../hooks/use-meta';
import { PostTags } from '../components/PostTag';

const Intro = styled.div`
  max-width: 40rem;
  padding: 1rem;
  margin: 2rem auto 4rem;

  @media (min-width: 786px) {
    margin-top: 6rem;
  }
`;

export default function Home() {
  const data = usePostQuery();
  const { title } = useMeta();

  return (
    <div>
      <MetaTags />

      <Layout wide hideHeader>
        <Intro>
          <h1 style={{ marginTop: '0' }}>{title}</h1>
          <p>
            Random notes, anecdotes and random scribbling from my tech life and
            work brain.
          </p>
          <h4>{data.totalCount} Posts about ...</h4>
          <PostTags
            tags={[
              'learning',
              'book',
              'guide',
              'talk',
              'debugging',
              'tools',
              'management',
              'efficiency',
              'monitoring',
              'startup',
              'code quality',
            ]}
            useLink
          />
        </Intro>
        <PostList>
          {data.edges.map(({ node }) => (
            <PostResult post={node} key={node.id} />
          ))}
        </PostList>
      </Layout>
    </div>
  );
}
