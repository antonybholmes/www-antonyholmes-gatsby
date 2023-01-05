import React from "react"
import BlueLink from "../components/link/blue-link"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { HEADER_LINKS } from "../menus"

export default function Page({ location }: IDataPageProps) {
  return (
    <ContentLayout title="Site Map" location={location}>
      <></>
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-3" slot="main">
        <section>
          <h3 className="mt-4 font-bold">Learn More</h3>
          {HEADER_LINKS.map((link: any, i: number) => {
            return (
              <div className="mt-2">
                <BlueLink ariaLabel={`Goto ${link.name}`} href={link.url}>
                  {link.name}
                </BlueLink>
              </div>
            )
          })}
        </section>

        <section>
          <h3 className="mt-4 font-bold">About</h3>

          <div className="mt-2">
            <BlueLink href="/help" ariaLabel="View help information">
              Help
            </BlueLink>
          </div>

          <div className="mt-2">
            <BlueLink href="/privacy" ariaLabel="View privacy information">
              Privacy Policy
            </BlueLink>
          </div>
          <div className="mt-2">
            <BlueLink href="/terms" ariaLabel="View terms and conditions">
              Terms of Use
            </BlueLink>
          </div>

          <div className="mt-2">
            <BlueLink href="/contact" ariaLabel="Contact us">
              Contact
            </BlueLink>
          </div>
        </section>
      </div>
    </ContentLayout>
  )
}

export const Head = () => <Seo title="Site Map" />
