import IBaseFields from "./base-fields"

export default interface IAuthorFields extends IBaseFields {
  id: string
  name: string
  title: string
  email: string
}
