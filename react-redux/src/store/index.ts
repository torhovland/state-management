import { Reducer } from "redux";
import { getType } from "typesafe-actions";
import { RootState } from "./types";
import * as actions from "./actions";

const initialState: RootState = {
  todos: []
};

export const reducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case getType(actions.loadTodos.request): {
      console.log("Loading...");
      return state;
    }
    case getType(actions.loadTodos.success): {
      console.log("Loaded.");
      return {
        ...state,
        todos: action.payload
      };
    }
    case getType(actions.loadTodos.failure): {
      console.log("Downloading todos failed:");
      console.log(action.payload);
      return state;
    }
    case getType(actions.addTodo): {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }
    case getType(actions.completeTodo): {
      return {
        ...state,
        todos: state.todos.map(todo => {
          return {
            ...todo,
            completeTime:
              todo.id === action.payload ? Date.now() : todo.completeTime
          };
        })
      };
    }
    default: {
      return state;
    }
  }
};
