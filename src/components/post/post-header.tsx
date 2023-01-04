import IPostProps from "../../interfaces/post-props"

import ContentDiv from "../content-div"
import PageTitle from "../page-title"
import HeroImage from "./hero-image"
import PostSectionLink from "./post-section-link"

interface IProps extends IPostProps {
  url: string
}

const PostHeader = ({ post, url }: IProps) => (
  <section className="bg-slate-800">
    <ContentDiv className="pt-24">
      <></>
      <>
        <div className="flex flex-col gap-y-2 md:w-60/100">
          {/* <Breadcrumb  /> */}
          {post.frontmatter.section && <PostSectionLink post={post} />}
          <PageTitle
            title={post.frontmatter.title}
            subTitle={post.frontmatter.description}
            className="text-slate-50"
          />
        </div>
        {/* <PostDetails post={post} className="block lg:hidden mb-8" /> */}

        <div className="-mb-32 pt-8">
          <HeroImage post={post} className="h-72 lg:h-96 xl:h-140" />
          {/* {post.frontmatter.heroCaption !== '' && <HeroImageCaption post={post} />} */}
        </div>
      </>
      <></>
    </ContentDiv>
  </section>
)

export default PostHeader
