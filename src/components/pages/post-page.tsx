import React from "react"
import IFieldMap from "../../interfaces/field-map"
import IPost from "../../interfaces/post"
import IPreviewPost from "../../interfaces/preview-post"
import PostLayout from "../../layouts/post-layout"
import BaseCol from "../base-col"
import ContentDiv from "../content-div"
import MorePosts from "../post/more-posts"
import PostBody from "../post/post-body"
import PostDetailsHoz from "../post/post-details-hoz"
import PostHeader from "../post/post-header"
import PostSocialMedia from "../post/post-social-media"
import PostSocialMediaVert from "../post/post-social-media-vert"
import PostTags from "../post/post-tags"
import RelatedPosts from "../post/related-posts"

interface IProps {
  post: IPost
  image: any
  imageMap: IFieldMap
  avatarMap: IFieldMap
  morePosts?: IPreviewPost[]
  readMorePosts?: IPreviewPost[]
}

const PostPage = ({
  post,
  image,
  imageMap,
  avatarMap,
  morePosts = [],
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

            <div>
              {morePosts.length > 0 && (
                <MorePosts
                  posts={morePosts}
                  imageMap={imageMap}
                  avatarMap={avatarMap}
                  title={`More on ${post.frontmatter.tags[0]}`}
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

// "Guides & Tutorials",
//   "Opinions",
//   "Retirement",
//   "News & Announcements",
//ightMode={index % 2 === 0}
//key={index}

export default PostPage
