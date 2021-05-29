import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

export default function MyFiles({ data }) {
  return (
    <Layout>
      <div>
        <h1>Available Files</h1>
        <ul>
          {data.allFile.edges
            .map(n => n.node)
            .map(n => (
              <li key={n.relativePath}>
                {n.relativePath},{n.birthTime}
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
