import IPost from "./post"
import IReviewFields from "./review-fields"

export default interface IReview extends IPost {
  frontmatter: IReviewFields
}
