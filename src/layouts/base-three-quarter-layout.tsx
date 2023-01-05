import React from "react"
import type ICrumbProps from "../interfaces/crumb-props"
import type ILayoutProps from "../interfaces/layout-props"
import cn from "../lib/class-names"
import createCrumbs from "../lib/create-crumbs"
import LayoutTitles from "./layout-titles"

export interface IProps extends ILayoutProps, ICrumbProps {
  isRight?: boolean
}

export default function BaseThreeQuarterLayout({
  title,
  location,
  showTitle = false,
  showCrumbs = true,
  superTitle,
  subTitle,
  tab,
  crumbs,
  isRight = true,
  className,
  children,
}: IProps) {
  if (!crumbs) {
    crumbs = createCrumbs(location.pathname)
  }

  return (
    <div
      className={cn("grid grid-cols-1 xl:grid-cols-4 xl:gap-x-16", className)}
    >
      {!isRight && (
        <div className="relative col-span-1 hidden xl:block">
          {
            // @ts-ignore
            children[1]
          }
        </div>
      )}
      <article className="col-span-3">
        <LayoutTitles
          title={title}
          location={location}
          superTitle={superTitle}
          subTitle={subTitle}
          crumbs={crumbs}
          showTitle={showTitle}
          showCrumbs={showCrumbs}
        />

        {
          // @ts-ignore
          children[0]
        }
      </article>
      {isRight && (
        <div className="relative col-span-1 hidden xl:block">
          {
            // @ts-ignore
            children[1]
          }
        </div>
      )}
    </div>
  )
}
