import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import { getPostRelativeUrl } from "../../lib/posts"
import BaseLink from "../link/base-link"
import BasePostImage from "./base-post-image"

const PostImage = ({ post, image, className }: IPostWithImageProps) => {
  const img = (
    <BasePostImage
      post={post}
      image={image}
      containerClassName="rounded-lg"
      className="scale-102 hover:scale-105"
    />
  )

  if (post.fields.slug) {
    return (
      <BaseLink
        href={getPostRelativeUrl(post.fields.slug)}
        ariaLabel={post.frontmatter.title}
      >
        {img}
      </BaseLink>
    )
  } else {
    return img
  }
}

export default PostImage
