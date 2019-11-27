<template>
  <div>
    <!-- if user - render login -->
    <!-- else render dashboard -->

    <button class="btn" v-on:click="logout">Log out</button>
    <Dashboard v-if="user" />
    <Login v-else @promptLogin="promptLogin" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase, { db, ui } from "./../firebase";
import store from "./../store";
import Login from "./Login.vue";
import Dashboard from "./Dashboard.vue";
export default {
  components: {
    Login,
    Dashboard
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    promptLogin() {
      const self = this;
      const uiConfig = {
        callbacks: {
          async signInSuccessWithAuthResult(authResults, redirectUrl) {
            self.loading = true;
            await store.commit("logUserIn", authResults);
            self.getAllEntriesFromDatabase();
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
    },
    logout() {
      const self = this;
      firebase
        .auth()
        .signOut()
        .then(async function() {
          console.log("successfully logging out and updating store");
          await store.commit("logUserOut");
          self.promptLogin();
        })
        .catch(function(error) {
          console.log("error", error);
        });
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