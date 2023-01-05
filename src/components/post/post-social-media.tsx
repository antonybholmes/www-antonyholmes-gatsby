import { getPostUrl } from "../../lib/posts"
import cn from "../../lib/class-names"
import IPostProps from "../../interfaces/post-props"
import FacebookIcon from "../../icons/facebook"
import LinkedInIcon from "../../icons/linkedin"
import TwitterIcon from "../../icons/twitter"
import BaseLink from "../link/base-link"
import React from "react"

export const CLS_TEXT_GRAY_HOVER = "w-6"

export const CLS_SOCIAL_ICON =
  "fill-slate-300 hover:fill-blue-400 transition-ani transition-color border border-slate-200 rounded-full p-2"

const PostSocialMedia = ({ post, className }: IPostProps) => {
  const url = getPostUrl(post.fields.slug)
  return (
    <section className={cn("flex flex-row items-center gap-x-2", className)}>
      <BaseLink
        ariaLabel="Post article to Twitter"
        href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title}&url=${url}`}
        className={CLS_SOCIAL_ICON}
      >
        <TwitterIcon className={CLS_TEXT_GRAY_HOVER} />
      </BaseLink>

      <BaseLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        ariaLabel="Post article to Facebook"
        className={CLS_SOCIAL_ICON}
      >
        <FacebookIcon className={CLS_TEXT_GRAY_HOVER} />
      </BaseLink>

      <BaseLink
        href={`https://www.linkedin.com/shareArticle?url=${url}`}
        ariaLabel="Post article to LinkedIn"
        className={CLS_SOCIAL_ICON}
      >
        <LinkedInIcon className={CLS_TEXT_GRAY_HOVER} />
      </BaseLink>
    </section>
  )
}

export default PostSocialMedia
