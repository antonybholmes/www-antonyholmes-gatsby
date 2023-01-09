import React from "react"
import IPostProps from "../../interfaces/post-props"
import cn from "../../lib/class-names"

export default function ReadingTime({ post, className }: IPostProps) {
  return (
    <div
      className={cn(
        "block whitespace-nowrap text-sm text-slate-500",
        className
      )}
    >
      {post.fields.readingTime.text}
    </div>
  )
}
