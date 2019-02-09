import React from 'react'
import { connect } from './overmind'

class Posts extends React.Component {
  componentDidMount() {
    this.props.overmind.actions.loadPosts()
  }
  render() {
    const { overmind } = this.props

    if (overmind.state.isLoadingPosts) {
      return <h4>Loading posts...</h4>
    }

    return (
      <ul>
        {overmind.state.posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    )
  }
}

export default connect(Posts)