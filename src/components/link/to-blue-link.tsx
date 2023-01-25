import cn from "../../lib/class-names"
import type IUnderlineLinkProps from "../../interfaces/underline-link-props"
import BaseLink from "./base-link"
import React from "react"

export default function ToBlueLink({
  href,
  ariaLabel,
  className,
  underline = false,
  children,
}: IUnderlineLinkProps) {
  return (
    <BaseLink
      href={href}
      ariaLabel={ariaLabel}
      underline={underline}
      className={cn(
        `trans-ani-300 transition-colors hover:text-blue-600`,
        className
      )}
    >
      {children}
    </BaseLink>
  )
}
