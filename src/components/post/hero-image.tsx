import React from "react"
import IPostWithImageProps from "../../interfaces/post-with-image-props"
import cn from "../../lib/class-names"
import GatsbyBaseImage from "../gatsby-base-image"
import HeroImageCaption from "./hero-image-caption"

interface IProps extends IPostWithImageProps {
  size?: number[]
  sizes?: number[]
}

const HeroImage = ({ post, image, size = [2048, 1024], className }: IProps) => (
  <div className="relative overflow-hidden rounded-xl">
    {/* <BasePostImage post={post}  size={size} className={cn(className)} /> */}

    <GatsbyBaseImage
      src={image}
      alt={post.frontmatter.title}
      className={cn("h-full w-full object-cover", className)}
    />

    {post.frontmatter.heroCaption && <HeroImageCaption post={post} />}
  </div>
)

export default HeroImage
