import React from "react"
import IClassProps from "../interfaces/class-props"
import cn from "../lib/class-names"
import { getAuthorUrl } from "../lib/urls"
import AvatarImage from "./avatar-image"
import BaseLink from "./link/base-link"
import VCenterRow from "./v-center-row"

interface IProps extends IClassProps {
  authors: string[]
}

const CompactAvatars = ({ authors, className }: IProps) => (
  <VCenterRow className="gap-x-3">
    <div
      className={cn("relative h-12", className)}
      style={{ width: `${3 + (authors.length - 1) * 0.5}rem` }}
    >
      {authors.map((author, index) => (
        <AvatarImage
          author={author}
          className={cn(
            "absolute h-12 w-12 border border-white",
            `ml-${index * 2}`
          )}
          key={index}
        />
      ))}
    </div>

    <ul className="flex flex-row flex-wrap items-center gap-x-1 text-sm font-bold">
      {authors.map((author, index) => (
        <li key={index}>
          <BaseLink
            href={getAuthorUrl(author)}
            ariaLabel={`Click to read more information about ${author}`}
            underline={true}
          >
            {author}
          </BaseLink>
          {index < authors.length - 2 && <span>,</span>}
          {index === authors.length - 2 && <span className="ml-1">&</span>}
        </li>
      ))}
    </ul>
  </VCenterRow>
)

export default CompactAvatars
