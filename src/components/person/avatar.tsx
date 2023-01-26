import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import { getAuthorBaseUrl } from "../../lib/urls"
import BaseCol from "../base-col"
import BaseLink from "../link/base-link"
import VCenterRow from "../v-center-row"
import AvatarImage from "./avatar-image"

interface IProps extends IClassProps {
  person: string
  avatarImage: any
  showTitle?: boolean
  isSmall?: boolean
}

const Avatar = ({
  person,
  avatarImage,
  showTitle = false,
  isSmall = false,
  className,
}: IProps) => {
  const href = getAuthorBaseUrl(person)

  return (
    <VCenterRow className={cn("gap-x-3", className)}>
      <BaseLink
        href={href}
        ariaLabel={`Click to read more about ${person}`}
        className={cn("block", [isSmall, "h-10 w-10", "h-12 w-12"])}
      >
        <AvatarImage person={person} avatarImage={avatarImage} />
      </BaseLink>
      <BaseCol>
        <BaseLink
          href={href}
          ariaLabel={`Click to read more information about ${person}`}
          underline={true}
          className={cn("font-bold", [isSmall, "text-sm"])}
        >
          {person}
        </BaseLink>

        {/* {showTitle && (
          <div className="text-sm font-light text-slate-500">
            {author.frontmatter.title.split(",")[0].trim()}
          </div>
        )} */}
      </BaseCol>
    </VCenterRow>
  )
}

export default Avatar
