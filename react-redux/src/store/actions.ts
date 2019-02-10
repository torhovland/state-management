import { createStandardAction, createAsyncAction } from "typesafe-actions";
import { Todo } from "./types";

export const loadTodos = createAsyncAction(
  "LOAD_TODOS_REQUEST",
  "LOAD_TODOS_SUCCESS",
  "LOAD_TODOS_FAILURE"
)<void, Todo[], Error>();

export const addTodo = createStandardAction("ADD_TODO").map(
  (text: string): { payload: Todo } => {
    const time = Date.now();

    return {
      payload: {
        id: time,
        text,
        creationTime: time,
        completeTime: null
      }
    };
  }
);

export const completeTodo = createStandardAction("COMPLETE_TODO")<number>();
