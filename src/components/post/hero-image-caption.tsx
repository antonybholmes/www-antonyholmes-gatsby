import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import React from "react"

const HeroImageCaption = ({ post, className }: IPostProps) => (
  <div
    className={cn(
      "absolute bottom-0 w-full py-3 text-center text-xs text-white",
      className
    )}
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    {post.frontmatter.heroCaption}
  </div>
)

export default HeroImageCaption
