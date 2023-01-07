import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import GatsbyBaseImage from "../gatsby-base-image"

interface IProps extends IPostWithImageProps {
  imgClassName?: string
  size?: number[]
  sizes?: number[]
}

export default function BasePostImage({
  post,
  image,
  className,
  imgClassName,
}: IProps) {
  return (
    <GatsbyBaseImage
      src={image}
      alt={post.frontmatter.title}
      className={className}
      imgClassName={imgClassName}
    />
  )
}
