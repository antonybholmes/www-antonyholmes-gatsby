import React from "react"
import BaseCol from "../components/base-col"
import BaseRow from "../components/base-row"
import BlueLink from "../components/link/blue-link"
import { SITE_NAME, UPDATED, VERSION, YEAR } from "../constants"
import LogoIcon from "../icons/logo-icon"
import IDataPageProps from "../interfaces/data-page-props"
import Seo from "../layouts/seo"
import ThreeQuarterLayout from "../layouts/three-quarter-layout"

const CLS = "block rounded-lg px-4 py-2 bg-blue-100 font-bold"

export default function Page({ location }: IDataPageProps) {
  return (
    <ThreeQuarterLayout title="Help" location={location}>
      <div slot="main">
        <BaseCol className="gap-y-4 rounded-xl bg-apple-gray p-6 text-sm">
          <BaseRow>
            <LogoIcon />
          </BaseRow>

          <div>
            <p>{`Version ${VERSION}`}</p>
            <p>{`Updated ${UPDATED}`}</p>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: `Copyright &copy; ${YEAR} ${SITE_NAME}. All rights reserved.`,
            }}
          />
        </BaseCol>

        <div className="mt-16">
          <p>
            This website is made possible by open source software and other
            services:
          </p>

          <ul className="mt-4 flex flex-row flex-wrap gap-2 text-sm">
            <li className={CLS}>
              <BlueLink
                href="https://www.gatsbyjs.com/"
                ariaLabel="View tool"
                underline={true}
              >
                Gatsby
              </BlueLink>
            </li>
            <li className={CLS}>
              <BlueLink
                href="https://reactjs.org/"
                ariaLabel="View tool"
                underline={true}
              >
                React
              </BlueLink>
            </li>
            <li className={CLS}>
              <BlueLink
                href="https://tailwindcss.com/"
                ariaLabel="View tool"
                underline={true}
              >
                Tailwind
              </BlueLink>
            </li>
            {/* <li className={CLS}>
            <BlueLink href="https://www.w3.org/html" ariaLabel="View tool">
              HTML5
            </BlueLink>
          </li> */}
            <li className={CLS}>
              <BlueLink
                href="https://www.npmjs.com"
                ariaLabel="View tool"
                underline={true}
              >
                NPM
              </BlueLink>
            </li>
            <li className={CLS}>
              <BlueLink
                href="https://nodejs.org/"
                ariaLabel="View tool"
                underline={true}
              >
                Node.js
              </BlueLink>
            </li>
            <li className={CLS}>
              <BlueLink
                href="https://github.com"
                ariaLabel="View tool"
                underline={true}
              >
                GitHub
              </BlueLink>
            </li>
            <li className={CLS}>
              <BlueLink
                href="https://code.visualstudio.com"
                ariaLabel="View tool"
                underline={true}
              >
                Visual Studio Code
              </BlueLink>
            </li>

            {/* <li className={CLS}>
            <BlueLink href="https://www.cloudflare.com/">Cloudflare</BlueLink>
          </li> */}
          </ul>
        </div>
      </div>
      <></>
    </ThreeQuarterLayout>
  )
}

export const Head = () => <Seo title="Help" />
