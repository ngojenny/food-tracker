<template>
  <div>count: {{count}}, doneTodosCount: {{doneTodosCount}}</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
const Counter = {
  computed: {
    localComputed() {},
    ...mapActions(["increment"]),
    ...mapMutations(["increment"]),
    ...mapGetters(["doneTodosCount"]),
    ...mapState({
      // arrow functions can make the code very succinct!
      count: state => state.count,
      // passing the string value 'count' is same as `state => state.count`
      countAlias: "count",
      // to access local state with `this`, a normal function must be used
      countPlusLocalState(state) {
        return state.count + this.localCount;
      }
      // doneTodosCount() {
      //   return this.$store.getters.doneTodosCount;
      // }
    })
  }
};
export default Counter;
</script>