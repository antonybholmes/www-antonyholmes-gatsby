import React from "react"
import { getTagBaseUrl } from "../../lib/urls"
import BlueLink from "../link/blue-link"

interface IProps {
  tag: string
}

const PostTagLinkBlue = ({ tag }: IProps) => (
  <BlueLink
    href={getTagBaseUrl(tag)}
    ariaLabel={`View all articles related to ${tag}`}
    underline={true}
  >
    {tag}
  </BlueLink>
)

export default PostTagLinkBlue
