import React from 'react'
import { connect } from './overmind'

class Todos extends React.Component {
  componentDidMount() {
    this.props.overmind.actions.createTodos();
  }
  render() {
    const { state, actions } = this.props.overmind;

    return (
      <div>
        {state.todos.map(todo =>
          <div>
            <h1>{todo.title}</h1>
            {todo.foo ? <div>{todo.foo.bar.baz}</div> : <div>No foobar</div>}
        </div>)}

        <button onClick={() => actions.addFoobar()}>Add foobar</button>
        <button onClick={() => actions.changeBaz()}>Change baz</button>
      </div>
    )
  }
}

export default connect(Todos)