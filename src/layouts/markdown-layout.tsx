import React from "react"
import MarkdownBody from "../components/markdown-body"
import IDataPageProps from "../interfaces/data-page-props"
import ThreeQuarterLayout from "./three-quarter-layout"

interface IProps extends IDataPageProps {
  post: any
}

export default function MarkdownLayout({ post, location }: IProps) {
  return (
    <ThreeQuarterLayout
      title={post.frontmatter.title}
      location={location}
      showTitle={true}
    >
      <div className="mb-16">
        <MarkdownBody html={post.html} className="text-justify" />
      </div>
      <></>
    </ThreeQuarterLayout>
  )
}
