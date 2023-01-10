import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import GatsbyBaseImage from "../gatsby-base-image"
import HeroImageCaption from "./hero-image-caption"

const HeroImage = ({ post, image, className }: IPostWithImageProps) => (
  <div className="relative z-10 overflow-hidden rounded-xl">
    {/* <BasePostImage post={post}  size={size} className={cn(className)} /> */}

    <GatsbyBaseImage
      src={image}
      alt={post.frontmatter.title}
      className={className}
    />

    {post.frontmatter.heroCaption && <HeroImageCaption post={post} />}
  </div>
)

export default HeroImage
