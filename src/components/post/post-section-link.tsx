import React from "react"
import IPostProps from "../../interfaces/post-props"
import cn from "../../lib/class-names"
import { getSectionBaseUrl } from "../../lib/urls"
import BaseLink from "../link/base-link"

interface IProps extends IPostProps {
  textSize?: string
}

const PostSectionLink = ({ post, textSize = "text-lg", className }: IProps) => {
  const items: any[] = []

  post.frontmatter.sections.sort().forEach((section, index) => {
    if (index > 0) {
      items.push(
        <li
          key={items.length}
          className="block h-1 w-1 rounded-full bg-purple-400"
        />
      )
    }

    items.push(
      <li key={items.length}>
        <BaseLink
          href={getSectionBaseUrl(section)}
          ariaLabel={`Read more ${section}`}
          underline={true}
          className={cn(
            "bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text font-bold text-transparent",
            textSize,
            className
          )}
        >
          {section}
        </BaseLink>
      </li>
    )
  })

  return <ul className="flex flex-row items-center gap-x-2">{items}</ul>
}

export default PostSectionLink
