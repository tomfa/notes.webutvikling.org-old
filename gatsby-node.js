const asUrl = require(`./src/utils/urlize`).asUrl
const path = require(`path`)
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)
const { slash } = require(`gatsby-core-utils`)

const getRelativeFolder = node => {
  const absolutePath = node.fileAbsolutePath
  const parsedPath = path.parse(absolutePath)
  return slash(path.relative("./src", parsedPath.dir))
}

exports.onCreateNode = async ({
  actions,
  node,
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  const blogPostTypes = ["Mdx"]
  if (blogPostTypes.includes(node.internal.type)) {
    const slug = createFilePath({ node, getNode })
      .replace(/^\/posts\//, "/")
      .replace(/^\/\d{4}\-\d{2}\-\d{2}\-/, "/")

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

    if (node.frontmatter.eImage) {
      let fileNode = await createRemoteFileNode({
        url: node.frontmatter.eImage, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's redux store
      })
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.frontmatter.eImage___NODE = fileNode.id
      }
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMdx(
        sort: { order: DESC, fields: frontmatter___date }
        filter: {
          fields: { relativeFolder: { regex: "/posts*/" } }
          frontmatter: { status: { ne: "draft" } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        distinct(field: frontmatter___tags)
      }
    }
  `)

  const posts = result.data.allMdx.edges
    .map(e => e.node)
    .reduce((posts, post) => {
      if (posts.length !== 0) {
        posts[posts.length - 1].next = post
        post.prev = posts[posts.length - 1]
      }
      posts.push(post)
      return posts
    }, [])
  const tags = result.data.allMdx.distinct

  posts.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/mdx-post.js`),
      context: {
        slug: node.fields.slug,
        next: node.next && {
          slug: node.next.fields.slug,
          title: node.next.frontmatter.title,
        },
        prev: node.prev && {
          slug: node.prev.fields.slug,
          title: node.prev.frontmatter.title,
        },
      },
    })
  })

  tags.forEach(tag => {
    createPage({
      path: `tag/${asUrl(tag)}`,
      component: path.resolve(`./src/templates/tag-page.js`),
      context: {
        tag,
      },
    })
  })
}
