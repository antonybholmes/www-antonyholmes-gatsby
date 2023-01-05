import React from "react"
import type ICrumbProps from "../interfaces/crumb-props"
import type ILayoutProps from "../interfaces/layout-props"
import BaseThreeQuarterLayout from "./base-three-quarter-layout"
import ContentLayout from "./content-layout"

export interface IProps extends ILayoutProps, ICrumbProps {
  isRight?: boolean
}

export default function ThreeQuarterLayout({
  title,
  showTitle = false,
  showCrumbs = true,
  superTitle,
  subTitle,
  location,
  tab,
  crumbs,
  isRight = true,
  className,
  headerChildren,
  children,
}: IProps) {
  return (
    <ContentLayout
      title={title}
      location={location}
      tab={tab}
      showTitle={false}
      showCrumbs={false}
      headerChildren={headerChildren}
      className={className}
    >
      <></>

      <BaseThreeQuarterLayout
        title={title}
        showTitle={showTitle}
        location={location}
        tab={tab}
        isRight={isRight}
        crumbs={crumbs}
      >
        {children}
      </BaseThreeQuarterLayout>
    </ContentLayout>
  )
}
