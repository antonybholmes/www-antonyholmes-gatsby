import IAuthorMap from "../../interfaces/author-map"
import IAuthorPost from "../../interfaces/author-post"
import { getAllPosts } from "./post"

export const getAllEntries = (authorMap: IAuthorMap): IAuthorPost[] => {
  let ret = getAllPosts(authorMap)

  ret = ret.sort((post1, post2) => {
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

  return ret
}
