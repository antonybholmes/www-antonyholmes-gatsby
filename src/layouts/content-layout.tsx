import React from "react"
import ContentDiv from "../components/content-div"
import type ICrumbProps from "../interfaces/crumb-props"
import type ILayoutProps from "../interfaces/layout-props"
import type IPageTitleProps from "../interfaces/page-title-props"
import createCrumbs from "../lib/create-crumbs"
import BaseLayout from "./base-layout"
import LayoutTitles from "./layout-titles"

export interface IProps extends ILayoutProps, ICrumbProps, IPageTitleProps {
  headerClassName?: string
}

export default function ContentLayout({
  title = "",
  location,
  subTitle,
  superTitle,
  showTitle = false,
  showCrumbs = true,
  tab,
  isIndexed,
  headerClassName, //"text-white bg-card-blue lg:text-slate-900 lg:bg-white",
  crumbs,
  className,
  headerChildren,
  children,
}: IProps) {
  if (!crumbs) {
    crumbs = createCrumbs(location.pathname)
  }

  return (
    <BaseLayout
      title={title}
      location={location}
      tab={tab}
      isIndexed={isIndexed}
      className={className}
      headerChildren={headerChildren}
    >
      <ContentDiv className={headerClassName}>
        <></>
        <div className="mt-28">
          <LayoutTitles
            title={title}
            superTitle={superTitle}
            location={location}
            subTitle={subTitle}
            crumbs={crumbs}
            showTitle={showTitle}
            showCrumbs={showCrumbs}
          />

          {
            // @ts-ignore
            children[0]
          }
        </div>
        <></>
      </ContentDiv>
      <ContentDiv>
        <></>
        <>
          {
            // @ts-ignore
            children[1]
          }
        </>
        <></>
      </ContentDiv>
    </BaseLayout>
  )
}
