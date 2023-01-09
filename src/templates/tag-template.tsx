import React from "react"
import BlueLink from "../components/link/blue-link"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getUrlFriendlyTag } from "../lib/tags"

export default function Page({ pageContext, data, location }: IDataPageProps) {
  const { title, url, tags } = pageContext

  return (
    <ContentLayout title={title} location={location} showTitle={true}>
      <></>
      <ul className="flex list-inside list-disc flex-col gap-y-2">
        {tags.map((tag: string, index: number) => {
          return (
            <li key={index}>
              <BlueLink
                href={getUrlFriendlyTag(tag)}
                ariaLabel={`View ${title} posts`}
              >
                {tag}
              </BlueLink>
            </li>
          )
        })}
      </ul>
    </ContentLayout>
  )
}

export function Head({ pageContext }: IDataPageProps) {
  return <Seo title={pageContext.title} />
}
