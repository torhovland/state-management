import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { RootState } from "./store/types";
import { Todo } from "./store/types";

const age = (todo: Todo) => Date.now() - todo.creationTime;

const averageAge = (todos: Todo[]) => {
  const l = todos.length;

  if (l == 0) return 0;

  return (
    todos
      .filter(todo => !todo.completeTime)
      .map(todo => age(todo))
      .reduce((a, b) => a + b, 0) / l
  );
};

const mapStateToProps = (state: RootState) => ({
  todos: state.todos
});

type Props = ReturnType<typeof mapStateToProps>;

const AverageAge = ({ todos = [] }: Props) => {
  const avgAge = averageAge(todos);

  return (
    <div>
      Average age:{" "}
      {avgAge === 0 ? "none" : moment.duration(averageAge(todos)).humanize()}
    </div>
  );
};

export default connect(mapStateToProps)(AverageAge);
