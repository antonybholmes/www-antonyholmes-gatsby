import type ICrumb from "../interfaces/crumb"
import { toCapitalCase } from "./text"

export const BREADCRUMB_EXCLUDE = ["Category", "Section", "Tag", "Page"]

function _formatName(name: string) {
  return toCapitalCase(name.replace(/^\d{4}-\d{2}-\d{2}-/, ""))
    .replaceAll("-", " ")
    .replace("Faq", "FAQ")
}

export default function createCrumbs(url: string): ICrumb[] {
  const segments = url.split("/").filter(s => s.length > 0)

  const crumbs: ICrumb[] = []

  for (let i = 0; i < segments.length; ++i) {
    // strip date from slug then attempt to convert
    // to more readable form by capitalizing and
    // changing dashes to spaces.
    const name = _formatName(segments[i])

    const path = `/${segments.slice(0, i + 1).join("/")}`
    if (!BREADCRUMB_EXCLUDE.includes(name) && name.search(/^\d+$/) === -1) {
      crumbs.push([name, path])
    }
  }

  return crumbs
}
