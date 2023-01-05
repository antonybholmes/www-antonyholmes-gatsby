import React from "react"
import Footer from "../components/footer"
import Header from "../components/header/header"
import type ILayoutProps from "../interfaces/layout-props"
import cn from "../lib/class-names"

interface IProps extends ILayoutProps {
  headerChildren?: any
}

export default function BaseLayout({
  title,
  location,
  tab,
  className,
  headerMode = "light",
  headerChildren,
  children,
}: IProps) {
  return (
    <>
      {/* <Meta />
      <Seo title={title} />*/}
      <Header title={title} tab={tab} headerMode={headerMode}>
        {headerChildren}
      </Header>

      <main className={cn("min-h-screen w-full", className)}>{children}</main>
      <Footer />
    </>
  )
}
