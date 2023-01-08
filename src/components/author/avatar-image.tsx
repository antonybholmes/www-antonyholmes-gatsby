import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import { getUrlFriendlyTag } from "../../lib/tags"
import GatsbyBaseImage from "./../gatsby-base-image"

export interface IAvatarProps extends IClassProps {
  author: string
  avatarMap: IFieldMap
  lazy?: boolean
  imgClassName?: string
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
  imgClassName,
}: IProps) => {
  return (
    <GatsbyBaseImage
      src={avatarMap[getUrlFriendlyTag(author)]}
      alt={`Picture of ${author}`}
      className={cn("relative z-10 rounded-full", className)}
      imgClassName={cn("rounded-full", imgClassName)}
    />
  )
}

export default AvatarImage
