import IBaseFields from "./base-fields"

export default interface IPostFields extends IBaseFields {
  index: number
  title: string
  description: string
  hero: string
  heroCaption: string
  authors: string[]
  sections: string[]
  related: string[]
  status: string

  tags: string[]
}
