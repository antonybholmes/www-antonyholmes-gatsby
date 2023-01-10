import React from "react"
import IPostsProps from "../../interfaces/posts-props"
import { getCategoryBaseUrl } from "../../lib/urls"
import BaseLink from "../link/base-link"
import BaseCategoryPosts from "./base-category-posts"
import PostsHeader from "./posts-header"

interface IProps extends IPostsProps {
  section: string
  rightMode?: boolean
}

const CategoryPosts = ({
  section: category,
  posts,
  imageMap,
  avatarMap,
  rightMode = false,
}: IProps) => (
  <section className="mt-8">
    <PostsHeader>
      <BaseLink
        href={getCategoryBaseUrl(category)}
        ariaLabel={`View all posts on ${category}`}
      >
        {category}
      </BaseLink>
    </PostsHeader>

    <BaseCategoryPosts
      posts={posts}
      rightMode={rightMode}
      imageMap={imageMap}
      avatarMap={avatarMap}
    />
  </section>
)

export default CategoryPosts
