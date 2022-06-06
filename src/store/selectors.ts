import { TodosStateType } from "./types";

export const selectTodos = (state: TodosStateType) => state.todos;