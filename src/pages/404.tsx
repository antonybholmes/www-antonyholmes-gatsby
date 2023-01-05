import React from "react"
import HCenterRow from "../components/h-center-row"
import BlueIndexLink from "../components/link/blue-index-link"
import PageTitle from "../components/page-title"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"

export default function Page({ location }: IDataPageProps) {
  return (
    <ContentLayout
      title="Page Not Found"
      showCrumbs={false}
      location={location}
    >
      <></>
      <div className="mt-16">
        <HCenterRow>
          <PageTitle title="The page you're looking for can't be found." />
        </HCenterRow>
        <HCenterRow>
          <BlueIndexLink
            href="/sitemap"
            ariaLabel="Click to view site map"
            className="mt-16"
            text="See our site map"
          />
        </HCenterRow>
      </div>
    </ContentLayout>
  )
}

export const Head = () => <Seo title="Page Not Found" />
