import React from 'react';
import { graphql, Link } from 'gatsby';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import PostHero from '../components/PostHero';
import PostFooter from '../components/PostFooter';
import { MetaTags } from '../components/MetaTags';

const VideoContainer = styled.div`
  max-width: 100%;
  background-color: #000000;
  margin: 0.3rem 0;
`;

const Video = props => (
  <ReactPlayer {...props} controls wrapper={VideoContainer} />
);

const shortcodes = { Link, Video };

export default function PageTemplate({ data, pageContext }) {
  const { mdx } = data;
  const { next, prev } = pageContext;
  const image = mdx.frontmatter.image || mdx.frontmatter.eImage;
  const imageUrl = image && image.childImageSharp.fluid.src || '/images/na.png';

  return (
    <>
      <Layout>
        <MetaTags
          title={mdx.frontmatter.title}
          description={mdx.excerpt}
          imageUrl={`https://notes.webutvikling.org${imageUrl}`}
          keywords={mdx.frontmatter.tags}
        />
        <PostHero {...mdx.frontmatter} />
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
        <PostFooter next={next} prev={prev} />
      </Layout>
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 200)
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
`;
