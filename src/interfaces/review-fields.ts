import IPostFields from "./post-fields"

export default interface IReviewFields extends IPostFields {
  pros: string[]
  cons: string[]
  details: string[]
  rating: number
}
