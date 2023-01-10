import { SITE_URL } from "../constants"
import IBasePost from "../interfaces/base-post"
import IFieldMap from "../interfaces/field-map"

export const getPostRelativeUrl = (slug: string): string => {
  return `/blog/${slug}`
}

export const getPostUrl = (slug: string): string => {
  return `${SITE_URL}/blog/${slug}`
}

export const getCategories = (post: IBasePost) => {
  const ret: any[] = []

  post.frontmatter.categories.forEach(category => {
    let path = category.split("/").concat(["All"])

    let pathMap: IFieldMap = {}
    ret.push(pathMap)

    pathMap[path[0]] = {}
    pathMap[path[0]]["All"] = {}

    path.forEach(p => {
      if (!(p in pathMap)) {
        pathMap[p] = {}
      }

      pathMap = pathMap[p]
    })
  })

  return ret
}
