import React from "react"
import IChildProps from "../interfaces/child-props"
import cn from "../lib/class-names"

export default function PostLayout({ className, children }: IChildProps) {
  return (
    <div className={cn("flex flex-row gap-x-4", className)}>
      <section className="hidden lg:block">{children[0]}</section>
      <article className="w-full lg:w-70/100">{children[1]}</article>
      <section className="hidden w-25/100 lg:block">{children[2]}</section>
    </div>
  )
}
