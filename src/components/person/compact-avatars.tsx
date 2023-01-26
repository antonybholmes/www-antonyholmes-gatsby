import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import { getUrlFriendlyTag } from "../../lib/tags"
import { getAuthorBaseUrl } from "../../lib/urls"
import BaseLink from "../link/base-link"
import VCenterRow from "../v-center-row"
import AvatarImage from "./avatar-image"

interface IProps extends IClassProps {
  people: string[]
  avatarMap: IFieldMap
  showImages?: boolean
}

export default function CompactAvatars({
  people,
  avatarMap,
  showImages = true,
  className,
}: IProps) {
  return (
    <VCenterRow className={cn("gap-x-3", className)}>
      {showImages && (
        <ul
          className="relative h-12"
          style={{ width: `${3 + (people.length - 1) * 0.5}rem` }}
        >
          {people.map((person, index) => (
            <li key={index}>
              <BaseLink
                href={getAuthorBaseUrl(person)}
                ariaLabel={`View more posts by ${person}`}
              >
                <AvatarImage
                  person={person}
                  avatarImage={avatarMap[getUrlFriendlyTag(person)]}
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
        {people.map((person, index) => (
          <li key={index}>
            <BaseLink
              href={getAuthorBaseUrl(person)}
              ariaLabel={`View more posts by ${person}`}
              underline={true}
            >
              {person}
            </BaseLink>
            {index < people.length - 2 && <span>,</span>}
            {index === people.length - 2 && <span className="ml-1">&</span>}
          </li>
        ))}
      </ul>
    </VCenterRow>
  )
}
