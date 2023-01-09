import React from "react"
import CheckIcon from "../../icons/check"
import CloseIcon from "../../icons/close"
import IFieldMap from "../../interfaces/field-map"
import IPreviewPost from "../../interfaces/preview-post"
import IReview from "../../interfaces/review"
import PostLayout from "../../layouts/post-layout"
import BaseCol from "../base-col"
import ContentDiv from "../content-div"
import ExpandTab from "../expand-tab"
import MorePosts from "../post/more-posts"
import PostBody from "../post/post-body"
import PostDetailsHoz from "../post/post-details-hoz"
import PostHeader from "../post/post-header"
import PostSocialMedia from "../post/post-social-media"
import PostSocialMediaVert from "../post/post-social-media-vert"
import PostTags from "../post/post-tags"
import RelatedPosts from "../post/related-posts"
import StarRating from "../star-rating"
import VCenterRow from "../v-center-row"

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
                <BaseCol className="gap-y-2">
                  <VCenterRow>
                    <StarRating rating={post.frontmatter.rating} />
                  </VCenterRow>

                  <ExpandTab title="Pros & Cons" isExpanded={true}>
                    <div className="my-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <ul className="flex flex-col gap-y-2 text-sm">
                        {post.frontmatter.pros.map(pro => {
                          return (
                            <li className="grid grid-cols-16 items-center gap-x-2 lg:grid-cols-20">
                              <div className="col-span-1">
                                <div className="flex h-4 w-4 flex-row items-center justify-center rounded-full bg-emerald-400 stroke-white">
                                  <CheckIcon className="w-3 stroke-4" />
                                </div>
                              </div>
                              <div className="lg:col-span-19 col-span-15">
                                {pro}
                              </div>
                            </li>
                          )
                        })}
                      </ul>

                      <ul className="flex flex-col gap-y-2 text-sm">
                        {post.frontmatter.cons.map(con => {
                          return (
                            <li className="grid grid-cols-16 items-center gap-x-2 lg:grid-cols-20">
                              <div className="col-span-1">
                                <div className="flex h-4 w-4 flex-row items-center justify-center rounded-full bg-rose-400 stroke-white">
                                  <CloseIcon className="w-3 stroke-4" />
                                </div>
                              </div>
                              <div className="lg:col-span-19 col-span-15">
                                {con}
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </ExpandTab>

                  <ExpandTab title="Details" isExpanded={true}>
                    <ul className="my-2 flex list-inside list-disc flex-col gap-y-1 text-sm">
                      {post.frontmatter.details.map((detail, index) => {
                        return <li key={index}>{detail}</li>
                      })}
                    </ul>
                  </ExpandTab>
                </BaseCol>
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
