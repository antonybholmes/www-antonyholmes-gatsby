import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import PlaceholderImage, { IPlaceholderProps } from "../placeholder-image"

interface IProps extends IPostWithImageProps, IPlaceholderProps {}

export default function BasePostImage({
  post,
  image,
  containerClassName,
  className,
  imgClassName,
}: IProps) {
  return (
    <PlaceholderImage
      src={image}
      alt={post.frontmatter.title}
      containerClassName={containerClassName}
      className={className}
      imgClassName={imgClassName}
    />
  )
}
