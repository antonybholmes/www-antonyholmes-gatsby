import React from "react"
import cn from "../../lib/class-names"
import AvatarImage, { IAvatarProps } from "./avatar-image"

export default function AvatarImageLarge({
  person,
  personImage,
  className,
  containerClassName,
  imgClassName,
}: IAvatarProps) {
  return (
    <AvatarImage
      person={person}
      personImage={personImage}
      size={[640, 640]}
      className={className}
      containerClassName={cn("scale-102 hover:scale-105", containerClassName)}
      imgClassName={imgClassName}
      lazy={false}
    />
  )
}
