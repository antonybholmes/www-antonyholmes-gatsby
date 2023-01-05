import React from "react"
import IClassProps from "../interfaces/class-props"
import IFieldMap from "../interfaces/field-map"
import cn from "../lib/class-names"
import Avatar from "./avatar"
import WrapRow from "./wrap-row"

interface IProps extends IClassProps {
  authors: string[]
  avatarMap: IFieldMap
  showTitle?: boolean
  isSmall?: boolean
}

const Avatars = ({
  authors,
  avatarMap,
  showTitle = false,
  isSmall = false,
  className,
}: IProps) => (
  <WrapRow className={cn("gap-4", className)}>
    {authors.map((author, index) => (
      <Avatar
        author={author}
        avatarMap={avatarMap}
        isSmall={isSmall}
        key={index}
      />
    ))}
  </WrapRow>
)

export default Avatars
