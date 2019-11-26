<template>
  <div class="greeting">
    <p>👋 {{userName}}</p>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "Jenny"
    };
  },
  computed: {
    ...mapState({
      userName: state => {
        return state.user.user.displayName;
      }
    })
  }
};
</script>