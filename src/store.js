import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      {id: 1, text: 'get cereal', done: true},
      {id: 2, text: 'get milk', done: false}
    ],
    user: null,
  },
  methods: {
    getData() {
      console.log('pretend to get some data')
    },
    getOtherData() {
      console.log('pretend to get other data')
    }
  },
  mutations: {
    // mutations are synchronous transaction
    increment(state, payload) {
      state.count += payload.amount
    },
    logUserIn(state, payload) {
      console.log('mutating global state', payload)
      state.user = payload;
    },
    logUserOut(state) {
      state.user = null;
    }
  },
  actions: {
    // actions commit mutations
    // contain arbituary asynchronous operations
    increment({commit}) {
      commit('increment')
    },
    incrementAsync ({commit}) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    async actionA ({commit}) {
      commit('gotdata', await this.getData())
    },
    async action({dispatch, commit}) {
      await dispatch('actionA') // wait for action a to finish
      commit('gotOtherData', await this.getOtherData())
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})

// store.commit('increment')

console.log(store.state.count);

export default store;