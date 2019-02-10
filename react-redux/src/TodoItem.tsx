import * as React from "react";
import moment from "moment";
import { Todo } from "./store/types";

interface Props {
  todo: Todo;
  completeTodo: (id: number) => void;
}

const TodoItem = ({ todo, completeTodo }: Props) => {
  return (
    <div>
      <input type="checkbox" onClick={() => completeTodo(todo.id)} />
      <label>{todo.text}</label>
      <div>{moment(todo.creationTime).format()}</div>
    </div>
  );
};

export default TodoItem;
