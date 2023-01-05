import PostLayout from "../../layouts/post-layout"
import IPost from "../../interfaces/post"
import IPreviewPost from "../../interfaces/preview-post"
import BaseCol from "../base-col"
import PostBody from "../post/post-body"
import PostDetailsHoz from "../post/post-details-hoz"
import PostHeader from "../post/post-header"
import PostSocialMedia from "../post/post-social-media"
import PostSocialMediaVert from "../post/post-social-media-vert"
import PostTags from "../post/post-tags"
import RelatedPosts from "../post/related-posts"
import ContentDiv from "../content-div"
import React from "react"
import IFieldMap from "../../interfaces/field-map"

interface IProps {
  post: IPost
  image: any
  imageMap: IFieldMap
  avatarMap: IFieldMap
  readMorePosts?: IPreviewPost[]
}

const PostPage = ({
  post,
  image,
  imageMap,
  avatarMap,
  readMorePosts = [],
}: IProps) => (
  <>
    <article>
      <PostHeader post={post} image={image} />

      <ContentDiv className="my-40">
        <></>
        <BaseCol className="gap-y-4 lg:gap-y-8">
          <PostDetailsHoz post={post} avatarMap={avatarMap} />

          <PostSocialMedia post={post} className="lg:hidden" />

          <PostLayout>
            <PostSocialMediaVert post={post} />

            <BaseCol tag="section" className="gap-y-8">
              <PostBody html={post.html} className="text-justify" />
              <PostTags post={post} />
            </BaseCol>

            <></>
          </PostLayout>
        </BaseCol>
        <></>
      </ContentDiv>
    </article>

    {readMorePosts.length > 0 && (
      <ContentDiv className="py-16">
        <></>
        <RelatedPosts
          posts={readMorePosts}
          imageMap={imageMap}
          title="Keep Reading"
          avatarMap={avatarMap}
        />
        <></>
      </ContentDiv>
    )}
  </>
)

// "Guides & Tutorials",
//   "Opinions",
//   "Retirement",
//   "News & Announcements",
//ightMode={index % 2 === 0}
//key={index}

export default PostPage
