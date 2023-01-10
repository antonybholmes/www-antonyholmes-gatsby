import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import GatsbyBaseImage from "../gatsby-base-image"

interface IProps extends IPostWithImageProps {
  imgClassName?: string
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
