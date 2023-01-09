import {
  PEOPLE_SLUG,
  BROKERAGE_SLUG,
  CREDIT_CARD_SLUG,
  PAGE_1_SLUG,
  PORTFOLIO_SLUG,
  REVIEW_SLUG,
  SECTION_SLUG,
  TAG_SLUG,
  CATEGORY_SLUG,
} from "../constants"
import { getUrlFriendlyTag } from "./tags"

export const getAuthorUrl = (name: string) => {
  return `${PEOPLE_SLUG}/${name.toLowerCase().replace(" ", "-")}`
}

export const getReviewBaseUrl = (tag: string) => {
  return `${REVIEW_SLUG}/${getUrlFriendlyTag(tag)}`
}

export const getCreditCardTagUrl = (tag: string) => {
  return `${CREDIT_CARD_SLUG}/tag/${getUrlFriendlyTag(tag)}`
}

export const getBrokerageTagUrl = (tag: string) => {
  return `${BROKERAGE_SLUG}/tag/${getUrlFriendlyTag(tag)}`
}

export const getPortfolioTagUrl = (tag: string) => {
  return `${PORTFOLIO_SLUG}/tag/${getUrlFriendlyTag(tag)}`
}

export const getCategoryBaseUrl = (category: string) => {
  return `${CATEGORY_SLUG}/${getUrlFriendlyTag(category)}`
}

export const getSectionBaseUrl = (category: string, section: string) => {
  return `${CATEGORY_SLUG}/${getUrlFriendlyTag(
    category
  )}/section/${getUrlFriendlyTag(section)}`
}

export const getTagBaseUrl = (tag: string) => {
  return `${TAG_SLUG}/${getUrlFriendlyTag(tag)}`
}

export const getTagUrl = (tag: string) => {
  return getTagBaseUrl(tag)
}
