import { useStaticQuery, graphql } from "gatsby"

export const usePostQuery = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query PostQuery {
        allMdx(sort: { order: DESC, fields: frontmatter___date }) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                image {
                  publicURL
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
  )
  return allMdx
}
