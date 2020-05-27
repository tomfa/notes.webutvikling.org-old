import React from "react"
import { Image } from "./Image"
import { PostTags } from "./PostTag"

const PostHero = ({ image, imageAlt, title, date, tags }) => {
  return (
    <>
      {image && <Image fluid={image.childImageSharp.fluid} alt={imageAlt} />}
      <h1>{title}</h1>
      <small>{date}</small>
      <PostTags tags={tags} inline />
    </>
  )
}

export default PostHero
