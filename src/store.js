import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    deleteEntryConfirmationVisible: false,
  },
  mutations: {
    logUserIn(state, payload) {
      state.user = payload;
    },
    logUserOut(state) {
      state.user = null;
    },
    toggleDeleteEntryConfirmation(state) {
      state.deleteEntryConfirmationVisible = !state.deleteEntryConfirmationVisible
    }
  }
})

export default store;