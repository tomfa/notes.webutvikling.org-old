import React from "react"
import styled from "styled-components"
import { useTags } from "../hooks/use-tags"

const FooterBg = styled.div`
  background-color: #3a3a3a;
`

const FooterTag = styled.footer`
  color: #dedede;
  padding: 10rem 2rem;
  margin: 10rem auto 0;
  min-height: 10rem;
  display: grid;
  grid-template-areas:
    "what"
    "whoami";
  grid-gap: 1rem;
  max-width: 100rem;

  @media (min-width: 800px) {
    grid-template-areas: "what whoami";
  }
`

const Div = styled.div`
  grid-area: ${props => props.ga};
  text-align: ${props => props.ta || ""};

  & > ul {
    text-align: ${props => props.ta || ""};
  }
`

const List = styled.ul`
  list-style: none;
  color: white;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  & > a {
    color: white;
  }

  & > a:hover,
  & > a:focus {
    color: #7478ef;
  }
`

const FooterHeader = styled.h3`
  margin-top: 0;
  font-size: 2rem;
  color: rgb(214, 222, 235);
  background-color: #3a3a3a;
`

export const Footer = () => {
  const tags = useTags().slice(0, 12)
  return (
    <FooterBg>
    <FooterTag>
      <Div area="what">
        <FooterHeader>What</FooterHeader>
        <List>
          <ListItem>These are just notes and scribbl.</ListItem>
          <ListItem>Don't take anything seriously.</ListItem>
          <ListItem>Add a grain of salt.</ListItem>
          <ListItem>Usually I don't know what I'm talking about.</ListItem>
          <ListItem>↑ Also good rules for the Internet as a whole.</ListItem>
        </List>
      </Div>
      <Div area="whoami" ta="right">
        <FooterHeader>Me</FooterHeader>
        <List>
          <ListItem>
            <a href="https://github.com/tomfa">Github</a>
          </ListItem>
          <ListItem>
            <a href="https://twitter.com/tommfa">Twitter</a>
          </ListItem>
          <ListItem>
            <a href="https://www.linkedin.com/in/fagerbekk/">LinkedIn</a>
          </ListItem>
        </List>
      </Div>
    </FooterTag>
    </FooterBg>
  )
}
