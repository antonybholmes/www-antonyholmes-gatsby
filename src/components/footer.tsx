import React from "react"
import getCopyright from "../lib/copyright"
import { INFO_LINKS } from "../menus"
import ContentDiv from "./content-div"
import WhiteLink from "./link/white-link"

const Footer = () => (
  <footer className="py-16 text-xs">
    <ContentDiv>
      <></>

      <ul className="flex flex-col items-center  gap-y-6 border-t border-slate-300 pt-12">
        <li>{getCopyright()}</li>
        <li>
          <ul className="flex flex-row gap-y-4 gap-x-8">
            {INFO_LINKS.map(
              (link: { name: string; url: string }, index: number) => (
                <li key={index}>
                  <WhiteLink
                    href={link.url}
                    ariaLabel={`View ${link.name}`}
                    underline={true}
                  >
                    {link.name}
                  </WhiteLink>
                </li>
              )
            )}
          </ul>
        </li>
        {/* <ul className="flex flex-row justify-center gap-x-8">
          <li>{getCopyright()}</li>
        </ul> */}
      </ul>
      <></>
    </ContentDiv>

    {/* <ContentDiv className="py-8">
      <></>
      <>
        <ul className="flex flex-row justify-center gap-x-8">
          <li>{getCopyright()}</li>
        </ul>
      </>
      <></>
    </ContentDiv> */}
  </footer>
)

export default Footer
