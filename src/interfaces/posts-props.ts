import IClassProps from "./class-props"
import IFieldMap from "./field-map"
import IPreviewPost from "./preview-post"

export default interface IPostsProps extends IClassProps {
  posts: IPreviewPost[]
  imageMap: IFieldMap
  avatarMap: IFieldMap
}
