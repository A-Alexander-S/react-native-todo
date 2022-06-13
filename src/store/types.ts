import { TodoItemType } from "../screens/TodoList/TodoList.types"
import { FETCH_STATUSES } from "../utils/constants"
import {
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  CHANGE_TODO,
  DELETE_TODO
} from "./actions"

export type TodosMapType = {
  [id: string]: TodoItemType
}

export type TodosStateType = {
  todos: {
    [id: string]: TodoItemType, //TodosMapType
  },
  status: FETCH_STATUSES
}

export type GetTodosRequestActionType = {
  type: typeof GET_TODOS_REQUEST,
}

export type GetTodosSuccesstActionType = {
  type: typeof GET_TODOS_SUCCESS,
  payload: TodosMapType
}

export type GetTodosFailuretActionType = {
  type: typeof GET_TODOS_FAILURE,
  payload: any
}

export type ChangeTodoActionType = {
  type: typeof CHANGE_TODO,
  payload: TodoItemType
}

export type DeleteTodoActionType = {
  type: typeof DELETE_TODO,
  payload: number
}

export type ActionType =
  GetTodosRequestActionType
  | GetTodosSuccesstActionType
  | GetTodosFailuretActionType
  | ChangeTodoActionType
  | DeleteTodoActionType;

  // export interface IgetTodosThunk {
  //   () => (dispatch: any) => void
  // }