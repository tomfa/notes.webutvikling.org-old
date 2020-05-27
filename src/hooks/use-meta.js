import { useStaticQuery, graphql } from "gatsby"

export const useMeta = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            description
            shortTitle
            title
          }
        }
      }
    `
  )
  return data.site.siteMetadata
}
