import IBasePost from "./base-post"
import IReviewFields from "./review-fields"

export default interface IBaseReview extends IBasePost {
  frontmatter: IReviewFields
}
