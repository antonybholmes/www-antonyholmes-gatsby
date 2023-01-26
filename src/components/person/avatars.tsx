import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import Avatar from "./avatar"
import WrapRow from "../wrap-row"
import { getUrlFriendlyTag } from "../../lib/tags"

interface IProps extends IClassProps {
  people: string[]
  avatarMap: IFieldMap
  showTitle?: boolean
  isSmall?: boolean
}

const Avatars = ({
  people,
  avatarMap,
  showTitle = false,
  isSmall = false,
  className,
}: IProps) => (
  <WrapRow className={cn("gap-4", className)}>
    {people.map((person, index) => (
      <Avatar
        person={person}
        avatarImage={avatarMap[getUrlFriendlyTag(person)]}
        isSmall={isSmall}
        key={index}
      />
    ))}
  </WrapRow>
)

export default Avatars
