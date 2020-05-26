const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { slash } = require(`gatsby-core-utils`)

const getRelativeFolder = node => {
  const absolutePath = node.fileAbsolutePath
  const parsedPath = path.parse(absolutePath)
  return slash(path.relative("./src", parsedPath.dir))
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const blogPostTypes = ["Mdx"]
  if (blogPostTypes.includes(node.internal.type)) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    const relativeFolder = getRelativeFolder(node)
    createNodeField({
      node,
      name: `relativeFolder`,
      value: relativeFolder,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { fields: { relativeFolder: { regex: "/posts*/" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/mdx-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
