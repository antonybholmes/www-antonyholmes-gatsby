import React from "react"
import IPostsProps from "../../interfaces/posts-props"
import PostsHeader from "./posts-header"
import PreviewPost from "./preview-post"

const LatestPosts = ({ posts, imageMap, avatarMap }: IPostsProps) => (
  <section className="mt-8">
    <PostsHeader>Latest Posts</PostsHeader>

    <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-4">
      {posts.slice(0, 4).map((post, index) => {
        return (
          <PreviewPost
            post={post}
            image={imageMap[post.frontmatter.hero]}
            showAvatarImage={false}
            headerClassName="text-3xl"
            avatarMap={avatarMap}
            dateBelow={true}
          />
        )
      })}
    </div>
  </section>
)

export default LatestPosts
