import BaseLink from "../link/base-link"
//import Search from '../search/search'
import LogoIcon from "../../icons/logo-icon"
import ContentDiv from "../content-div"
import HeaderLinks from "./header-links"
import IHeaderProps from "./header-props"
import IMenuProps from "./menu-props"
import React from "react"

interface IProps extends IHeaderProps, IMenuProps {
  scrollY: number
}

function LargeHeader({
  title,
  tab,
  headerMode = "light",
  showMenu = false,
  scrollY,
  children,
}: IProps) {
  return (
    <ContentDiv className="hidden md:flex">
      <></>
      <nav className="flex flex-row items-center gap-16">
        <BaseLink href="/" ariaLabel="Goto Homepage" className="block">
          <LogoIcon headerMode={headerMode} />
        </BaseLink>

        <HeaderLinks
          title={title}
          tab={tab}
          headerMode={headerMode}
          showMenu={showMenu}
          scrollY={scrollY}
        />
        <div className="grow">{children && children}</div>
      </nav>
      <></>
    </ContentDiv>
  )
}

export default LargeHeader
