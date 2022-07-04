import { Asset } from "react-native-image-picker"
import { TodoListNavigationProps } from "../../navigation/Navigation.types"

export type TodoItemType = {
  completed: boolean,
  id: number,
  title: string,
  userId?: number,
  imgs: Asset[]
}

export type TodoListPropsType = {
  navigation: TodoListNavigationProps
}