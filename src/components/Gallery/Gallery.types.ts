import { Asset } from "react-native-image-picker"

export type GalleryPropsType = {
  imgs: Asset[],
  onPress: (uri?: string) => void
}