import { Dispatch } from "react";
import { TodoItemType } from "../screens/TodoList/TodoList.types";
import { TODOS_URL } from "../utils/constants";
import { TodosMapType } from "./types";
export const GET_TODOS_REQUEST = 'TODOS::GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'TODOS::GET_TODOS_SUCCESS';
export const GET_TODOS_FAILURE = 'TODOS::GET_TODOS_FAILURE';
export const CHANGE_TODO = 'TODOS::CHANGE_TODO';

export const getTodosRequestAction = () => ({
  type: GET_TODOS_REQUEST,
});

export const getTodosSuccessAction = (todos: TodosMapType) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFailureAction = (e: any) => ({
  type: GET_TODOS_FAILURE,
  payload: e
});

export const getTodosThunk = () => (dispatch: any) => {
  fetch(TODOS_URL)
    .then<TodoItemType[]>(res => res.json())
    .then(result => {
      const todos = result.slice(0, 20).reduce<TodosMapType>((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {});
      dispatch(getTodosSuccessAction(todos));
    })
    .catch(e => {
      console.warn(e);
      dispatch(getTodosFailureAction(e));
    });
}

export const changeTodoAction = (newTodo: TodoItemType) => ({
  type: CHANGE_TODO,
  payload: newTodo
});

// export const changeTodoThunk = (newTodo: TodoItemType) => (dispatch: any) => {
//   dispatch(changeTodo(newTodo));
// }