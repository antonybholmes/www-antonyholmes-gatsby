import IPostsProps from "../../interfaces/posts-props"
import PreviewPost from "./preview-post"

const MorePosts = ({ posts }: IPostsProps) => (
  <section className="mb-32 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
    {posts.map(post => (
      <PreviewPost key={post.slug} post={post} headerClassName="text-3xl" />
    ))}
  </section>
)

export default MorePosts
