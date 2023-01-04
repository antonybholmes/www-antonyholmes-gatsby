import { join } from "path"
import { GENERIC_IMAGES } from "../../constants"
import IAuthorMap from "../../interfaces/author-map"
import IAuthorPost from "../../interfaces/author-post"
import IBasePost from "../../interfaces/base-post"
import IFieldMap from "../../interfaces/field-map"
import { getCanonicalPostSlug } from "../slug"
import { getAllMDFiles } from "./files"
import { getPostFields } from "./markdown"

export const POSTS_DIR = join(process.cwd(), "_content", "posts")

export const getPostPaths = () => {
  return getAllMDFiles(POSTS_DIR)
}

export const getPostBySlug = (path: string, index: number = -1): IBasePost => {
  const canonicalSlug = getCanonicalPostSlug(path)

  // const fullPath = join(
  //   isPublished ? POSTS_DIR : DRAFTS_DIR,
  //   `${slug}.md`
  // )

  const match = canonicalSlug.match(/(\d{4})-(\d{2})-(\d{2})/)

  const date = match ? match.slice(1, 4).join("-") : "2022-01-01"

  const post = {
    index,
    slug: `/blog/${canonicalSlug}`,
    date: date,
    frontmatter: getPostFields(path),
  }

  if (post.frontmatter.hero === "") {
    post.frontmatter.hero = `generic${(index % GENERIC_IMAGES) + 1}`
  }

  return post
}

export const getAllPosts = (authorMap: IAuthorMap): IAuthorPost[] => {
  const allPosts = getPostPaths()
    .map((path, index) => getPostBySlug(path, index))
    .filter(post => {
      return (
        process.env.NODE_ENV === "development" ||
        post.frontmatter.status === "published"
      )
    })
    // sort posts by date in descending order
    .sort((post1, post2) => {
      const d1 = new Date(post1.date)
      const d2 = new Date(post2.date)
      if (d1 > d2) {
        return -1
      } else if (d1 < d2) {
        return 1
      } else {
        // dates equal so compare names
        return post1.frontmatter.title.localeCompare(post2.frontmatter.title)
      }
    })
    .map((post, index) => {
      return {
        ...post,
        index,
        authors: post.frontmatter.authors.map(a => authorMap[a]),
      }
    })

  return allPosts
}

export const allPostsBySlugMap = (
  posts: { slug: string; fields: IFieldMap }[]
) => {
  let ret: any = {}

  posts.forEach(post => {
    ret[post.slug] = post
  })

  return ret
}

export const getSectionMap = (posts: any[], max: number = -1): IFieldMap => {
  const sectionMap: IFieldMap = {}

  posts.forEach(post => {
    if (!(post.frontmatter.section in sectionMap)) {
      sectionMap[post.frontmatter.section] = []
    }

    if (max === -1 || sectionMap[post.frontmatter.section].length < max) {
      sectionMap[post.frontmatter.section].push(post)
    }
  })

  return sectionMap
}
