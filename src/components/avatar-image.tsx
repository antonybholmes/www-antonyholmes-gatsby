import React from "react"
import IClassProps from "../interfaces/class-props"
import IFieldMap from "../interfaces/field-map"
import cn from "../lib/class-names"
import { getUrlFriendlyTag } from "../lib/tags"
import GatsbyBaseImage from "./gatsby-base-image"

export interface IAvatarProps extends IClassProps {
  author: string
  avatarMap: IFieldMap
  lazy?: boolean
}

interface IProps extends IAvatarProps {
  size?: [number, number]
  sizes?: number[]
  root?: string
}

const AvatarImage = ({
  author,
  avatarMap,
  size = [320, 320],
  className,
}: IProps) => {
  return (
    <GatsbyBaseImage
      src={avatarMap[getUrlFriendlyTag(author)]}
      alt={`Picture of ${author}`}
      className={cn("rounded-full", className)}
    />
  )
}

export default AvatarImage
