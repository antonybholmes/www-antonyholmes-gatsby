import IAuthorPost from "./author-post"
import IReviewFields from "./review-fields"

export default interface IAuthorReview extends IAuthorPost {
  frontmatter: IReviewFields
}
