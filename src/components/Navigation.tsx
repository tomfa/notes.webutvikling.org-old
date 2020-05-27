import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

const Nav = styled.nav``

const HomeLink = styled(Link)`
  font-size: 1.4rem;
  color: white;
  text-decoration: none;
`

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
    <>
      <HomeLink to={`/`}>{data.site.siteMetadata.title}</HomeLink>
      <Nav>
        <Link to={`/about/`}>About</Link>
      </Nav>
    </>
  )
}
