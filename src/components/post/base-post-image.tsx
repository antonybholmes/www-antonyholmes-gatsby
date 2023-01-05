import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import BaseImage from "../base-image"
import React from "react"
import { GENERIC_IMAGES } from "../../constants"

interface IProps extends IPostProps {
  root?: string
  size?: number[]
  sizes?: number[]
  loading?: "lazy" | "eager"
}

export default function BasePostImage({
  post,
  root = "/posts",
  size = [2048, 1024],
  loading = "lazy",
  className,
}: IProps) {
  let hero = post.frontmatter.hero

  if (hero === "undefined") {
    hero = `generic1`
  }

  return (
    <BaseImage
      src={`/assets/images/posts/${hero}.webp`}
      alt={post.frontmatter.title}
      root={root}
      size={size}
      loading={loading}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
