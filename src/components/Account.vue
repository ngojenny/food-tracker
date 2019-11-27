<template>
  <div class="header-top">
    <div class="wrapper">
      <Greeting />
      <button class="btn" v-on:click="logout">Log out</button>
    </div>
  </div>
</template>

<script>
import firebase, { ui } from "./../firebase";
import store from "./../store";
import Greeting from "./Greeting";
export default {
  components: {
    Greeting
  },
  methods: {
    logout() {
      const self = this;
      firebase
        .auth()
        .signOut()
        .then(async function() {
          console.log("successfully logging out and updating store");
          window.localStorage.removeItem("user");
          await store.commit("logUserOut");
          self.$router.push({ path: `/` });
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }
  }
};
</script>

<style scoped>
.header-top {
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 5px 10px rgba(212, 212, 212, 0.5);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
}
</style>