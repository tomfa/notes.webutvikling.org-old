import { useStaticQuery, graphql } from 'gatsby';

export const usePostQuery = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query PostQuery {
        allMdx(
          sort: { order: DESC, fields: frontmatter___date }
          filter: {
            fields: { relativeFolder: { regex: "/posts*/" } }
            frontmatter: { status: { ne: "draft" } }
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
                    fluid(maxWidth: 400, quality: 70) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                eImage {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 70) {
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
    `
  );
  return allMdx;
};
