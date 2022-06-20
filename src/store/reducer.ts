import { FETCH_STATUSES } from "../utils/constants";
import {
  CHANGE_TODO,
  DELETE_TODO,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS
} from "./actions";
import {
  ActionType,
  ChangeTodoActionType,
  DeleteTodoActionType,
  TodosStateType
} from "./types";

const initialState: TodosStateType = {
  todos: {},
  status: FETCH_STATUSES.idle
}

const todosReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request
      }
    }
    case GET_TODOS_SUCCESS: {
      return {
        ...state,
        status: FETCH_STATUSES.success,
        todos: action.payload
      }
    }
    case GET_TODOS_FAILURE: {
      return {
        ...state,
        status: FETCH_STATUSES.failure
      }
    }
    case CHANGE_TODO: {
      const typeAction = action as ChangeTodoActionType;
      console.log(typeAction.payload)
      return {
        ...state,
        todos: {
          ...state.todos,
          [typeAction.payload.id]: typeAction.payload
        }
      }
    }
    case DELETE_TODO: {
      const typeAction = action as DeleteTodoActionType;
      const todos = { ...state.todos };
      delete todos[typeAction.payload];
      return {
        ...state,
        todos
      }
    }
    default:
      return state;
  }
}

export default todosReducer;
