---
title: "Notes on GraphQL"
date: 2016-09-25
image: ./Screen-Shot-2016-09-25-at-14.39.59.png
video: https://www.youtube.com/watch?v=Oh5oC98ztvI
tags: [GraphQL]
author: tomfa
status: publish
---

<Video url="https://www.youtube.com/watch?v=Oh5oC98ztvI" />

A few notes on ["GraphQL: Designing a Data Language" by Lee Byron. ](https://www.youtube.com/watch?v=Oh5oC98ztvI)

#### Motivation for GraphQL

*   REST APIs can often require multiple queries in order to return a meaningful set of information. This can lead to many roundtrips to the server and high load time for the user.
*   Developing client software includes assumptions on what data will be returned from the API. This often leads to bugs.

#### Properties of GraphQL

*   GraphQL is not about "graphs". There's no requirement to model your data with nodes and edges. Instead it's about the mental model of interconnected data, such as being able to query about e.g. your _friends_, and their _events_, and the number of attendees to that event all in one go.
*   GraphQL does not replace SQL or MongoDB, instead it replaces REST, in that it's a new way for frontend and backend to communicate.
*   Statically typed
*   Queries can be validated against schema both backend and frontend
*   Queries is in a readable JSON-like format
    
    ```
    {
         me {
             name
         }
    }
    ```
    
*   Predictable return data in the same structure as query
    
    ```
    {
         "me" {
             "name": "Tomas Albertsen"
         }
    }
    ```
    

* * *

*   [GraphQL > Introduction to GraphQL](http://graphql.org/learn/)
*   [Github > GraphiQL: Web based IDE that validates your queries](https://github.com/graphql/graphiql)
