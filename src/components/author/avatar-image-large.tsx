import React from "react"
import AvatarImage, { IAvatarProps } from "./avatar-image"

export default function AvatarImageLarge({
  author,
  avatarMap,
  className,
  imgClassName,
}: IAvatarProps) {
  return (
    <AvatarImage
      author={author}
      avatarMap={avatarMap}
      size={[640, 640]}
      className={className}
      imgClassName={imgClassName}
      lazy={false}
    />
  )
}
