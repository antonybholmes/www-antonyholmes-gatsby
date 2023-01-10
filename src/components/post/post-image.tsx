import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import { getPostRelativeUrl } from "../../lib/posts"
import BaseLink from "../link/base-link"
import BasePostImage from "./base-post-image"

const PostImage = ({ post, image, className }: IPostWithImageProps) => {
  const img = (
    <div className={cn("relative z-10 overflow-hidden rounded-lg", className)}>
      <BasePostImage
        post={post}
        image={image}
        className="transition-ani h-full w-full scale-102 transition-transform hover:scale-105"
      />
    </div>
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
