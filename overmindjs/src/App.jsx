import React from 'react'
import { connect } from './overmind'
import Todos from "./Todos";
import Posts from "./Posts";

class App extends React.Component {
  render() {
    return (
        <div>
            <Todos />
      <Posts />
        </div>
    )
  }
}

export default connect(App)