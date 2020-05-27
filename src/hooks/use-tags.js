import { useStaticQuery, graphql } from "gatsby"
import { asUrl } from "../utils/urlize"

export const useTags = () => {
  const data = useStaticQuery(
    graphql`
      query allCategories {
        allMdx {
          distinct(field: frontmatter___tags)
        }
      }
    `
  )
  const tags = data.allMdx.distinct
  return tags.map(tag => ({
    tag,
    url: `/tag/${asUrl(tag)}`,
  }))
}
