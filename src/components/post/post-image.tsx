import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import { getPostRelativeUrl } from "../../lib/posts"
import BaseLink from "../link/base-link"
import BasePostImage from "./base-post-image"

interface IProps extends IPostWithImageProps {
  size?: number[]
  sizes?: number[]
  lazy?: boolean
}

const PostImage = ({ post, image, size = [512, 256], className }: IProps) => {
  const img = (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <BasePostImage
        post={post}
        image={image}
        size={size}
        className="transition-transform duration-300 hover:scale-104"
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
