import React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';

const FooterBg = styled.div`
  background-color: #3a3a3a;
`;

const FooterTag = styled.footer`
  color: #dedede;
  padding: 10rem 1rem 4rem;
  margin: 10rem auto 0;
  min-height: 10rem;
  display: grid;
  grid-template-areas:
    'what'
    'whoami';
  grid-gap: 1rem;
  max-width: 100rem;

  @media (min-width: 800px) {
    grid-template-areas: 'what whoami';
  }
`;

const Whoami = styled.div`
  grid-area: whoami;
  text-align: center;

  & > ul {
    text-align: center;
  }

  @media (min-width: 786px) {
    text-align: right;

    & > ul {
      text-align: right;
    }
  }
`;

const What = styled.div`
  grid-area: what;
  text-align: center;
  padding-bottom: 4rem;

  & > ul {
    text-align: center;
  }

  @media (min-width: 786px) {
    text-align: left;

    & > ul {
      text-align: left;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  color: white;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.4rem 0;
  & > a {
    color: white;
  }

  & > a:hover,
  & > a:focus {
    color: #7478ef;
  }
`;

const FooterHeader = styled.h3`
  margin-top: 0;
  font-size: 2rem;
  color: rgb(214, 222, 235);
  background-color: #3a3a3a;
`;

export const Footer = () => {
  return (
    <FooterBg>
      <FooterTag>
        <What>
          <FooterHeader>What</FooterHeader>
          <List>
            <ListItem>These are just notes and scribbl.</ListItem>
            <ListItem>Don't take anything seriously.</ListItem>
            <ListItem>Add a grain of salt.</ListItem>
            <ListItem>Usually I don't know what I'm talking about.</ListItem>
            <ListItem>↑ Also good rules for the Internet as a whole.</ListItem>
          </List>
        </What>
        <Whoami>
          <FooterHeader>Me</FooterHeader>
          <List>
            <ListItem>
              <a href="https://webutvikling.org">Homepage</a>
            </ListItem>
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
        </Whoami>
      </FooterTag>
    </FooterBg>
  );
};
