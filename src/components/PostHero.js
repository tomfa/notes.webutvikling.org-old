import React from "react"

const PostHero = ({ image, imageAlt, title, date }) => (
  <>
    {image && <img src={image.publicURL} alt={imageAlt} />}
    <h1>{title}</h1>
    <small>{date}</small>
  </>
)

export default PostHero
