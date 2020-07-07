import { useStaticQuery, graphql } from 'gatsby';
import { asUrl } from '../utils/urlize';

export const useTags = () => {
  const data = useStaticQuery(
    graphql`
      query allCategories {
        allMdx {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
          distinct(field: frontmatter___tags)
        }
      }
    `
  );
  const tags = data.allMdx.distinct;
  const tagCount = tags.reduce((obj, item) => {
    obj[item] = 0;
    return obj;
  }, {});
  const edges = data.allMdx.edges || [];
  edges.forEach(edge => {
    const tags = (edge.node.frontmatter && edge.node.frontmatter.tags) || [];
    tags.forEach(tag => (tagCount[tag] += 1));
  });

  return tags
    .map(tag => ({
      tag,
      url: `/tag/${asUrl(tag)}`,
      count: tagCount[tag],
    }))
    .sort((a, b) => b.count - a.count);
};
