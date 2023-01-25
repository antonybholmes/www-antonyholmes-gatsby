import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import type IClassProps from "../interfaces/class-props"
import IFieldMap from "../interfaces/field-map"
import cn from "../lib/class-names"

export interface IImageProps extends IClassProps {
  src: any
  alt: string
  containerClassName?: string
  imgClassName?: string
  imgStyle?: IFieldMap
}

export default function GatsbyBaseImage({
  src,
  alt,
  className,
  style,
  containerClassName,
  imgClassName,
  imgStyle,
}: IImageProps) {
  const image = getImage(src)

  return (
    <div
      className={cn(
        "relative z-10 h-full w-full overflow-hidden",
        containerClassName
      )}
    >
      <GatsbyImage
        //@ts-ignore
        image={image}
        className={cn(
          "trans-ani-700 h-full w-full transition-placeholder",
          className
        )}
        style={style}
        imgClassName={cn("w-full h-full", imgClassName)}
        imgStyle={imgStyle}
        alt={alt}
      />
    </div>
  )
}
