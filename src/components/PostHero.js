import React from "react"
import { Image } from "./Image"

const PostHero = ({ image, imageAlt, title, date }) => (
  <>
    {image && <Image src={image.publicURL} alt={imageAlt} />}
    <h1>{title}</h1>
    <small>{date}</small>
  </>
)

export default PostHero
