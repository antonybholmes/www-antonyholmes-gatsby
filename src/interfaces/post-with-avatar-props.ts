import IFieldMap from "./field-map"
import IPostWithImageProps from "./post-with-image-props"

export default interface IPostWithAvatarProps extends IPostWithImageProps {
  avatarMap: IFieldMap
}
