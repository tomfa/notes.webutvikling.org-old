import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useMeta } from "../hooks/use-meta"

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  > ul {
    display: none;
  }

  @media (min-width: 800px) {
    > ul {
      display: inline-block;
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`

const HomeLink = styled(Link)`
  font-size: 3rem;
  color: white;
  text-decoration: none;
`

const Logo = styled.img`
  margin-right: 1rem;
  display: inline-block;
  height: 4rem;
`

export const Navigation = () => {
  const { shortTitle } = useMeta()

  return (
    <Nav>
      <HomeLink to={`/`} title="Home">
        {shortTitle}
      </HomeLink>
      <Link to={`/about/`}>
        <Logo src="/images/logo.svg" alt="About N / A" />
      </Link>
    </Nav>
  )
}
