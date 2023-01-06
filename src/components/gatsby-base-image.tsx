import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import type IClassProps from "../interfaces/class-props"
import cn from "../lib/class-names"

export interface IImageProps extends IClassProps {
  src: any
  alt: string
}

export default function GatsbyBaseImage({
  src,
  alt,
  className,
  style,
}: IImageProps) {
  const image = getImage(src)

  return (
    //@ts-ignore
    <GatsbyImage
      image={image}
      className={cn("relative z-0", className)}
      style={style}
      alt={alt}
    />
  )
}
