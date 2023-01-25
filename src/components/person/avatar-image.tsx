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
    <div
      className={cn("relative z-10 overflow-hidden rounded-full", className)}
    >
      <GatsbyBaseImage
        src={avatarMap[getUrlFriendlyTag(author)]}
        alt={`Picture of ${author}`}
        className={cn("h-full w-full", containerClassName)}
        imgClassName={cn("rounded-full w-full h-full", imgClassName)}
      />
    </div>
  )
}

export default AvatarImage
