import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useMeta } from "../hooks/use-meta"

const Nav = styled.nav`
  max-width: ${props => (!props.wide ? '50rem' : '100rem')};
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
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
  background-color: rgba(255,255,255,0.8);
  font-size: 3rem;
  color: black;
  text-decoration: none;
  padding: 1.2rem 2rem;
`

export const Navigation = ({ wide }: { wide?: boolean }) => {
  const { shortTitle } = useMeta()

  return (
    <Nav wide={wide}>
      <HomeLink to={`/`} title="Home">
        {shortTitle}
      </HomeLink>
    </Nav>
  )
}
