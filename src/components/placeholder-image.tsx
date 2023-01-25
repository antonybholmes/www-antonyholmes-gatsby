import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { CSSProperties } from "react"
import type IClassProps from "../interfaces/class-props"
import cn from "../lib/class-names"

export interface IPlaceholderProps extends IClassProps {
  containerClassName?: string
  imgClassName?: string
}

export interface IImageProps extends IPlaceholderProps {
  src: any
  alt: string
  imgStyle?: CSSProperties
}

export default function PlaceholderImage({
  src,
  alt,
  className,
  style,
  containerClassName,
  imgClassName,
  imgStyle,
}: IImageProps) {
  return (
    <div className={cn("relative z-10 overflow-hidden", containerClassName)}>
      <GatsbyImage
        //@ts-ignore
        image={getImage(src)}
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
