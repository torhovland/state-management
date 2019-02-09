import { Overmind } from 'overmind'
import { createConnect } from 'overmind-react'

export const overmind = new Overmind({
  state: {
    isLoadingPosts: false,
    posts: [],
    todos: []
  },
  effects: {
    getPosts() {
      return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
    }
  },
  actions: {
    loadPosts: async ({ state, effects }) => {
      state.isLoadingPosts = true
      state.posts = await effects.getPosts()
      state.isLoadingPosts = false
    },
    createTodos: ({state}) => {
      state.todos = [ {id: 1, title: "Lag suppe"}, {id: 2, title: "Lær piano"} ];
    },
    addFoobar: ({state}) => {
      state.todos[0].foo = { bar: { baz: "wadooble" }};
    },
    changeBaz: ({state}) => {
      state.todos[0].foo.bar.baz = "yeehah";
    }
  }
})

export const connect = createConnect(overmind)