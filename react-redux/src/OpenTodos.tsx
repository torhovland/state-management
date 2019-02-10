import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "./store/types";

type Props = ReturnType<typeof mapStateToProps>;

const OpenTodos = ({ todos = [] }: Props) => (
  <div>Open todos: {todos.length}</div>
);

const mapStateToProps = (state: RootState) => ({
  todos: state.todos
});

export default connect(mapStateToProps)(OpenTodos);
