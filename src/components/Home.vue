<template>
  <div>
    <Login @promptLogin="promptLogin" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase, { ui } from "./../firebase";
import store from "./../store";
import Login from "./Login.vue";

export default {
  components: {
    Login
  },
  methods: {
    promptLogin() {
      const self = this;
      const uiConfig = {
        callbacks: {
          async signInSuccessWithAuthResult(authResults, redirectUrl) {
            await store.commit("logUserIn", authResults);
            self.$router.push({ path: `/${self.userUID}` });
            window.localStorage.setItem("user", JSON.stringify(authResults));
            return true;
          }
        },
        signInSuccessUrl: "http://localhost:8080/#/",
        signInOptions: [
          // List of OAuth providers supported.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  },
  computed: {
    ...mapMutations(["logUserOut"]),
    ...mapState({
      user: state => {
        return state.user;
      },
      userUID: state => {
        return state.user.user.uid;
      }
    })
  }
};
</script>