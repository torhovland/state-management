import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "./store/types";
import { addTodo, completeTodo } from "./store/actions";
import TodoItem from "./TodoItem";

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const TodoList = ({ todos = [], addTodo, completeTodo }: Props) => {
  const inputEl = React.useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (inputEl.current === null) return;
        addTodo(inputEl.current.value);
        inputEl.current.value = "";
      }}
    >
      <h1>Todo list</h1>
      {todos
        .filter(todo => !todo.completeTime)
        .map(todo => (
          <div key={todo.creationTime}>
            <TodoItem todo={todo} completeTodo={completeTodo} />
          </div>
        ))}
      <input ref={inputEl} type="text" />
      <button>Add</button>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos
});

const dispatchProps = {
  addTodo,
  completeTodo
};

export default connect(
  mapStateToProps,
  dispatchProps
)(TodoList);
