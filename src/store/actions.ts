import { Dispatch } from "react";
import { TodoItemType } from "../screens/TodoList/TodoList.types";
import { TODOS_URL } from "../utils/constants";
import {
  ChangeTodoActionType,
  DeleteTodoActionType,
  GetTodosFailuretActionType,
  GetTodosRequestActionType,
  GetTodosSuccesstActionType,
  TodosMapType
} from "./types";
export const GET_TODOS_REQUEST = 'TODOS::GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'TODOS::GET_TODOS_SUCCESS';
export const GET_TODOS_FAILURE = 'TODOS::GET_TODOS_FAILURE';
export const CHANGE_TODO = 'TODOS::CHANGE_TODO';
export const DELETE_TODO = 'TODOS::DELETE_TODO';

export const getTodosRequestAction = () => <GetTodosRequestActionType>({
  type: GET_TODOS_REQUEST,
});

export const getTodosSuccessAction = (todos: TodosMapType) => <GetTodosSuccesstActionType>({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFailureAction = (e: any) => <GetTodosFailuretActionType>({
  type: GET_TODOS_FAILURE,
  payload: e
});

export const getTodosThunk = () => (dispatch: any) => {
  dispatch(getTodosRequestAction());
  fetch(TODOS_URL)
    .then<TodoItemType[]>(res => res.json())
    .then(result => {
      const todos = result.reduce<TodosMapType>((acc, el) => { // const todos = result.slice(0, 20).reduce<TodosMapType>((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {});

      dispatch(getTodosSuccessAction(todos));
    })
    .catch(e => {
      console.warn(e);
      dispatch(getTodosFailureAction(e));
    });
  // console.log(" getTodosThunk = () => (dispatch: any) =>")
}

export const changeTodoAction = (newTodo: TodoItemType) => <ChangeTodoActionType>({
  type: CHANGE_TODO,
  payload: newTodo
});

export const deleteTodoAction = (id: number) => <DeleteTodoActionType>({
  type: DELETE_TODO,
  payload: id
});