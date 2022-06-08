import { TodosStateType } from "./types";

export const selectTodos = (state: TodosStateType) => state.todos;
export const selectStatus = (state: TodosStateType) => state.status;