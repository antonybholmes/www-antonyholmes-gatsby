import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import type IClassProps from "../interfaces/class-props"
import IFieldMap from "../interfaces/field-map"

export interface IImageProps extends IClassProps {
  src: any
  alt: string
  imgClassName?: string
  imgStyle?: IFieldMap
}

export default function GatsbyBaseImage({
  src,
  alt,
  className,
  style,
  imgClassName,
  imgStyle,
}: IImageProps) {
  const image = getImage(src)

  return (
    <GatsbyImage
      //@ts-ignore
      image={image}
      className={className}
      style={style}
      imgClassName={imgClassName}
      imgStyle={imgStyle}
      alt={alt}
    />
  )
}
