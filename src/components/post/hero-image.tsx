import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import PlaceholderImage from "../placeholder-image"
import HeroImageCaption from "./hero-image-caption"

const HeroImage = ({ post, image, className }: IPostWithImageProps) => (
  <div className="relative z-10 overflow-hidden rounded-xl">
    {/* <BasePostImage post={post}  size={size} className={cn(className)} /> */}

    <PlaceholderImage
      src={image}
      alt={post.frontmatter.title}
      className={className}
    />

    {post.frontmatter.heroCaption && <HeroImageCaption post={post} />}
  </div>
)

export default HeroImage
