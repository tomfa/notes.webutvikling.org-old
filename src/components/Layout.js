import React from "react"
import styled from "styled-components"

import { Header } from "./header"
import { Footer } from "./footer"
import { Navigation } from "./navigation"

const Main = styled.main`
  width: 100%;
`
const SiteWrapper = styled.div`
  margin: 0 auto;
  max-width: 40rem;
`

export default function Layout({ children }) {
  return (
    <SiteWrapper>
      <Header>
        <Navigation />
      </Header>
      {children}
      <Footer />
    </SiteWrapper>
  )
}
