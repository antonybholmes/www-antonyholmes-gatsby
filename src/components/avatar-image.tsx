import React from "react"
import IClassProps from "../interfaces/class-props"
import cn from "../lib/class-names"
import { getUrlFriendlyTag } from "../lib/tags"
import BaseImage from "./base-image"

export interface IAvatarProps extends IClassProps {
  author: string
  lazy?: boolean
}

interface IProps extends IAvatarProps {
  src?: string
  size?: [number, number]
  sizes?: number[]
  root?: string
}

const AvatarImage = ({ author, src, size = [320, 320], className }: IProps) => {
  if (src === undefined) {
    src = getUrlFriendlyTag(author)
  }

  return (
    <BaseImage
      src={`/assets/images/people/${src}.webp`}
      alt={`Picture of ${author}`}
      size={size}
      className={cn("rounded-full", className)}
    />
  )
}

export default AvatarImage
