import React from "react"
import getCopyright from "../lib/copyright"
import { INFO_LINKS } from "../menus"
import ContentDiv from "./content-div"
import WhiteLink from "./link/white-link"

const Footer = () => (
  <footer className="pt-16 text-sm">
    <ContentDiv>
      <></>

      <ul className="flex flex-row justify-center gap-x-8 rounded-lg bg-slate-100 p-4">
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

      <></>
    </ContentDiv>

    <ContentDiv className="py-8">
      <></>
      <>
        <ul className="flex flex-row justify-center gap-x-8">
          <li>{getCopyright()}</li>
        </ul>
      </>
      <></>
    </ContentDiv>
  </footer>
)

export default Footer
