import React from "react"
import { Image } from "./Image"
import { PostTags } from "./PostTag"

const PostHero = ({ eImage, image, imageAlt, title, date, tags }) => {
  const img = image || eImage
  return (
    <>
      {img && <Image fluid={img.childImageSharp.fluid} alt={imageAlt} />}
      <h1>{title}</h1>
      <small>{date}</small>
      <PostTags tags={tags} inline />
    </>
  )
}

export default PostHero
