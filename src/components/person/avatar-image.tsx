import React from "react"
import IClassProps from "../../interfaces/class-props"
import IFieldMap from "../../interfaces/field-map"
import cn from "../../lib/class-names"
import { getUrlFriendlyTag } from "../../lib/tags"
import GatsbyBaseImage from "../gatsby-base-image"

export interface IAvatarProps extends IClassProps {
  author: string
  avatarMap: IFieldMap
  lazy?: boolean
  containerClassName?: string
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
  containerClassName,
  imgClassName,
}: IProps) => {
  return (
    <GatsbyBaseImage
      src={avatarMap[getUrlFriendlyTag(author)]}
      alt={`Picture of ${author}`}
      containerClassName={cn("rounded-full", className)}
      className={containerClassName}
      imgClassName={cn("rounded-full", imgClassName)}
    />
  )
}

export default AvatarImage
