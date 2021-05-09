import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { MetaTags } from '../components/MetaTags';
import { PostResult } from '../components/PostResult';
import { PostList } from '../components/PostList';
import { PostTag } from '../components/PostTag';

const Intro = styled.div`
  padding: 1rem;
  max-width: 40rem;
  margin: 0;
`;

export default function TagTemplate({ data, pathContext }) {
  const { tag } = pathContext;
  const { edges, totalCount } = data.allMdx;

  return (
    <div>
      <MetaTags />

      <Layout>
        <Intro>
          <h1 style={{ marginTop: '0'}}>
            Posts about <PostTag style={{ fontSize: '2rem'}}>{tag}</PostTag>
          </h1>
          <h4>{totalCount} Posts</h4>
        </Intro>
        <PostList>
          {edges.map(({ node }) => (
            <PostResult key={node.id} post={node} />
          ))}
        </PostList>
      </Layout>
    </div>
  );
}

export const pageQuery = graphql`
  query TagPageQuery($tag: String) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: {
        fields: { relativeFolder: { regex: "/posts*/" } }
        frontmatter: { tags: { eq: $tag }, status: { ne: "draft" } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
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
            tags
            imageAlt
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;
