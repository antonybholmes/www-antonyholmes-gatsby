import cn from "../../lib/class-names"
import ILinkProps from "../../interfaces/link-props"
import IMouseProps from "../../interfaces/mouse-props"
import ExtLink from "./ext-link"

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
      >
        {children}
      </ExtLink>
    )
  } else {
    if (!children) {
      children = <>{href}</>
    }

    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={cn("m-0 p-0", [underline, `hover:underline`], className)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </a>
    )
  }
}

export default BaseLink
