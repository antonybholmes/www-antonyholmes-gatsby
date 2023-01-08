import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import ToBlueLink from "../link/to-blue-link"
import React from "react"
import { getPostRelativeUrl } from "../../lib/posts"

const PostTitleLink = ({ post, className }: IPostProps) => (
  <h2 className={cn("font-bold capitalize", className)}>
    <ToBlueLink
      href={getPostRelativeUrl(post.fields.slug)}
      ariaLabel={post.frontmatter.title}
    >
      {post.frontmatter.title}
    </ToBlueLink>
  </h2>
)

export default PostTitleLink
