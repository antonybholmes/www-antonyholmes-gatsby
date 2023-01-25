import React from "react"
import cn from "../../lib/class-names"
import AvatarImage, { IAvatarProps } from "./avatar-image"

export default function AvatarImageLarge({
  author,
  avatarMap,
  className,
  containerClassName,
  imgClassName,
}: IAvatarProps) {
  return (
    <AvatarImage
      author={author}
      avatarMap={avatarMap}
      size={[640, 640]}
      className={className}
      containerClassName={cn("scale-102 hover:scale-105", containerClassName)}
      imgClassName={imgClassName}
      lazy={false}
    />
  )
}
