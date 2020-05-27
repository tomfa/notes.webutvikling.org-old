import React from "react"
import styled from "styled-components"

import { Header } from "./header"
import { Footer } from "./footer"
import { Navigation } from "./navigation"

import "normalize.css"
import "./style.css"

const Main = styled.main`
  max-width: ${props => (!props.wide ? "40rem" : null)};
  margin: ${props => (!props.wide ? "0 auto" : null)};

  @media (max-width: 800px) {
    & > p,
    & > h1,
    & > h2,
    & > h3,
    & > h4,
    & > small {
      padding: 1rem;
    }
  }
`
const SiteWrapper = styled.div`
  max-width: 120rem;
  margin: 0 auto;
`

export default function Layout({ children, wide = false }) {
  return (
    <SiteWrapper>
      <Header>
        <Navigation />
      </Header>
      <Main wide={wide}>{children}</Main>
      <Footer />
    </SiteWrapper>
  )
}
