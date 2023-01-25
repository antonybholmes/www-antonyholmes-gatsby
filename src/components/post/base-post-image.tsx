import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import GatsbyBaseImage from "../gatsby-base-image"

interface IProps extends IPostWithImageProps {
  containerClassName?: string
  imgClassName?: string
}

export default function BasePostImage({
  post,
  image,
  containerClassName,
  className,
  imgClassName,
}: IProps) {
  return (
    <GatsbyBaseImage
      src={image}
      alt={post.frontmatter.title}
      containerClassName={containerClassName}
      className={className}
      imgClassName={imgClassName}
    />
  )
}
