import { StackRouter } from "@react-navigation/native";
import { TodosStateType } from "./types";

export const selectTodos = (state: TodosStateType) => state.todos;
export const selectStatus = (state: TodosStateType) => state.status;
export const selectTodoById = (id: number) => (state: TodosStateType) => state.todos[id];