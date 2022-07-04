import { TodoItemType } from "../../screens/TodoList/TodoList.types"

export type TodoItemPropsType = {
  todo: TodoItemType,
  i: number,
  onComplete: (id: number) => void,
  onDelete: (id: number) => void
  onPress: (id: number) => void
}