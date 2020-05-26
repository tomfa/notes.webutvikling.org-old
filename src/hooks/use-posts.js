import { useStaticQuery, graphql } from "gatsby"

export const usePostQuery = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query PostQuery {
        allMdx(filter: { fields: { relativeFolder: { regex: "/posts*/" } } }) {
          totalCount
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
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
