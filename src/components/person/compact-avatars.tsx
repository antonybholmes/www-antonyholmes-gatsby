import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import { getAuthorBaseUrl } from "../../lib/urls"
import BaseLink from "../link/base-link"
import VCenterRow from "../v-center-row"
import AvatarImage from "./avatar-image"

interface IProps extends IClassProps {
  authors: string[]
  avatarMap: IFieldMap
  showImages?: boolean
}

const CompactAvatars = ({
  authors,
  avatarMap,
  showImages = true,
  className,
}: IProps) => (
  <VCenterRow className={cn("gap-x-3", className)}>
    {showImages && (
      <ul
        className="relative h-12"
        style={{ width: `${3 + (authors.length - 1) * 0.5}rem` }}
      >
        {authors.map((author, index) => (
          <li key={index}>
            <BaseLink
              href={getAuthorBaseUrl(author)}
              ariaLabel={`View more posts by ${author}`}
            >
              <AvatarImage
                author={author}
                avatarMap={avatarMap}
                className={cn(
                  "absolute h-12 w-12 border border-white",
                  `ml-${index * 2}`
                )}
              />
            </BaseLink>
          </li>
        ))}
      </ul>
    )}

    <ul className="flex flex-row flex-wrap items-center gap-x-1 text-sm font-semibold">
      {authors.map((author, index) => (
        <li key={index}>
          <BaseLink
            href={getAuthorBaseUrl(author)}
            ariaLabel={`View more posts by ${author}`}
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
function getAuthorUrl(author: string): string {
  throw new Error("Function not implemented.")
}
