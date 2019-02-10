import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import "babel-polyfill";

const Todo = props => {
  const { todo, completeTodo } = props;

  return (
    <div>
      <input type="checkbox" onClick={() => completeTodo(todo.id)} />
      <label>{todo.text}</label>
      <div>{moment(todo.creationTime).format()}</div>
    </div>
  );
};

const TodoList = props => {
  const { todos, addTodo, completeTodo } = props;
  const inputEl = useRef(null);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addTodo(inputEl.current.value);
        inputEl.current.value = "";
      }}
    >
      <h1>Todo list</h1>
      {todos
        .filter(todo => !todo.completeTime)
        .map(todo => (
          <Todo
            key={todo.creationTime}
            todo={todo}
            completeTodo={completeTodo}
          />
        ))}
      <input ref={inputEl} type="text" />
      <button>Add</button>
    </form>
  );
};

const OpenTodos = props => {
  const { todos } = props;
  return <div>Open todos: {todos.length}</div>;
};

const AverageAge = props => {
  const { todos } = props;

  const age = todo => Date.now() - todo.creationTime;

  const averageAge = todos => {
    const l = todos.length;

    if (l == 0) return 0;

    return (
      todos
        .filter(todo => !todo.completeTime)
        .map(todo => age(todo))
        .reduce((a, b) => a + b, 0) / l
    );
  };

  const avgAge = averageAge(todos);
  return (
    <div>
      Average age: {avgAge === 0 ? "none" : moment.duration(avgAge).humanize()}
    </div>
  );
};

const Statistics = props => {
  const { todos } = props;

  return (
    <div>
      <h2>Statistics</h2>
      <OpenTodos todos={todos} />
      <AverageAge todos={todos} />
    </div>
  );
};

const ContentAnalysis = props => {
  const { todos } = props;
  const [words, setWords] = useState([]);

  const querystring = todos
    .map(todo => todo.text)
    .join(" ")
    .replace(/ /g, "+");

  const url = `https://api.datamuse.com/words?ml=${querystring}`;

  const analyzeWords = async () => {
    const response = await fetch(url);
    const results = await response.json();
    setWords(results.map(obj => obj.word));
  };

  useEffect(() => {
    analyzeWords();
  });

  return (
    <div>
      <h2>Content analysis</h2>
      <ul>
        {words.map(w => (
          <li>{w}</li>
        ))}
      </ul>
    </div>
  );
};

const Analytics = props => {
  const { todos } = props;

  return (
    <div>
      <h1>Analytics</h1>
      <Statistics todos={todos} />
      <ContentAnalysis todos={todos} />
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000");
    const todos = await response.json();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = text => {
    const time = Date.now();
    const newTodo = {
      id: time,
      creationTime: time,
      text
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = todoId => {
    setTodos(
      todos.map(todo => {
        return {
          ...todo,
          completeTime: todo.id === todoId ? Date.now() : todo.completeTime
        };
      })
    );
    console.log(todoId);
  };

  return (
    <div>
      <TodoList todos={todos} addTodo={addTodo} completeTodo={completeTodo} />
      <Analytics todos={todos} />
    </div>
  );
};

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
