import cn from "../../lib/class-names"
import ILinkProps from "../../interfaces/link-props"
import IMouseProps from "../../interfaces/mouse-props"
import ExtLink from "./ext-link"
import React from "react"
import { Link } from "gatsby"

interface IProps extends ILinkProps, IMouseProps {
  underline?: boolean
}

const BaseLink = ({
  href,
  target = "_blank",
  ariaLabel,
  underline = false,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseUp,
  onMouseDown,
  children,
}: IProps) => {
  if (!ariaLabel) {
    ariaLabel = `Click to visit ${href}`
  }

  // Test if we use the NextJS router link or a regular a for external urls
  const isExt =
    href &&
    (!href.startsWith("/") || href.startsWith("http") || href.startsWith("www"))

  if (isExt) {
    return (
      <ExtLink
        href={href}
        ariaLabel={ariaLabel}
        className={className}
        underline={underline}
        target={target}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      >
        {children}
      </ExtLink>
    )
  } else {
    if (!children) {
      children = <>{href}</>
    }

    return (
      <Link
        to={href}
        aria-label={ariaLabel}
        className={cn("m-0 p-0", [underline, `hover:underline`], className)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
      >
        {children}
      </Link>
    )
  }
}

export default BaseLink
