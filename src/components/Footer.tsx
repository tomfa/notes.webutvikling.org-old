import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useTags } from "../hooks/use-tags"

const FooterTag = styled.footer`
  background-color: #3a3a3a;
  color: #dedede;
  padding: 2rem;
  margin-bottom: 0;
  min-height: 10rem;
`

const LinkList = styled.ul`
  list-style: none;
  color: white;
  padding: 0;
  font-size: 1rem;
`

const ListItem = styled.li`
  line-height: 1.5em;
  & > a {
    color: white;
  }
`

export const Footer = () => {
  const tags = useTags().slice(0, 12)
  return (
    <>
      <FooterTag>
        <h3>Tags</h3>
        <LinkList>
          {tags.map(({ tag, url }) => (
            <ListItem>
              <Link to={url}>{tag}</Link>
            </ListItem>
          ))}
        </LinkList>
      </FooterTag>
    </>
  )
}
