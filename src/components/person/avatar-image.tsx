import React from "react"
import IClassProps from "../../interfaces/class-props"
import cn from "../../lib/class-names"
import PlaceholderImage, { IPlaceholderProps } from "../placeholder-image"

export interface IAvatarProps extends IClassProps, IPlaceholderProps {
  person: string
  personImage: any
  lazy?: boolean
}

interface IProps extends IAvatarProps {
  size?: [number, number]
  sizes?: number[]
  root?: string
}

export default function AvatarImage({
  person,
  personImage,
  size = [320, 320],
  className,
  containerClassName,
  imgClassName,
}: IProps) {
  return (
    <PlaceholderImage
      src={personImage}
      alt={`Picture of ${person}`}
      containerClassName={cn("rounded-full", className)}
      className={containerClassName}
      imgClassName={cn("rounded-full", imgClassName)}
    />
  )
}
