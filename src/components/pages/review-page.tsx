import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPreviewPost from "../../interfaces/preview-post"
import IReview from "../../interfaces/review"
import PostLayout from "../../layouts/post-layout"
import BaseCol from "../base-col"
import CondComp from "../component"
import ContentDiv from "../content-div"
import MorePosts from "../post/more-posts"
import PostBody from "../post/post-body"
import PostDetailsHoz from "../post/post-details-hoz"
import PostHeader from "../post/post-header"
import PostSocialMedia from "../post/post-social-media"
import PostSocialMediaVert from "../post/post-social-media-vert"
import PostTags from "../post/post-tags"
import ProsAndCons from "../post/pros-and-cons"
import RelatedPosts from "../post/related-posts"

interface IProps {
  post: IReview
  image: any
  imageMap: IFieldMap
  avatarMap: IFieldMap
  morePosts?: IPreviewPost[]
  readMorePosts?: IPreviewPost[]
}

export default function ReviewPage({
  post,
  image,
  imageMap,
  avatarMap,
  morePosts = [],
  readMorePosts = [],
}: IProps) {
  return (
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
                <CondComp cond={post.frontmatter.type === "review"}>
                  <ProsAndCons post={post} />
                </CondComp>
                <PostBody html={post.html} className="text-justify" />
                <PostTags post={post} />
              </BaseCol>

              <div>
                {morePosts.length > 0 && (
                  <MorePosts
                    posts={morePosts}
                    imageMap={imageMap}
                    avatarMap={avatarMap}
                    title={post.frontmatter.tags[0]}
                  />
                )}
              </div>
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
}
