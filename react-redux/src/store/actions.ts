import { createStandardAction } from "typesafe-actions";
import { Todo } from "./types";

export const fetchRequest = () => createStandardAction("FETCH_REQUEST");

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
