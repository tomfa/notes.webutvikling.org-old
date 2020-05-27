import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

const Nav = styled.nav``

export const Navigation = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <Nav>
      <Link to={`/`}>
        <h3>{data.site.siteMetadata.title}</h3>
      </Link>
      <Link to={`/about/`}>About</Link>
    </Nav>
  )
}
