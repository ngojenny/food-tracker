<template>
  <div v-if="user" class="wrapper">
    <header>
      <div class="header-top">
        <Greeting />
        <pre>
          {{userUID}}
        </pre>
      </div>
      <div class="header-bottom">
        <h1>Weekly Overview</h1>
        <div class="btn-container">
          <button class="btn btn-add" type="button" v-on:click="toggleEntryForm">New Entry ✎</button>
          <button class="btn" v-on:click="logout">Log out</button>
        </div>
      </div>
    </header>
    <main>
      <FilterSortBar :entries="entries" @search-query="searchQuery" @add-filters="addFilters" />
      <div v-if="showEntriesMatchingFilterCritera.length > 0" class="card-container">
        <!-- need to use something else for key -->
        <DayEntry
          v-for="entry in showEntriesMatchingFilterCritera"
          v-bind:key="entry.id"
          :date="entry.date"
          :foods="entry.foods"
          :gut="entry.gut"
          :skin="entry.skin"
          :tags="entry.tags"
          :notes="entry.notes"
        />
      </div>
      <div v-else class="card-container no-entries">
        <p>No entries found</p>
      </div>
      <EntryForm
        v-if="formVisible"
        @database-updated="getAllEntriesFromDatabase"
        @close-modal="toggleEntryForm"
      />
    </main>
  </div>
  <div v-else class="wrapper">
    <header class="non-auth">
      <h1>Food Diary</h1>
      <p>Find relationships between your food, gut and skin</p>
      <div class="firebase-list" id="firebaseui-auth-container"></div>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DayEntry from "./DayEntry.vue";
import EntryForm from "./EntryForm.vue";
import FilterSortBar from "./FilterSortBar.vue";
import Greeting from "./Greeting.vue";
import firebase, { db, ui } from "./../firebase";
import store from "./../store";
export default {
  name: "Dashboard",
  components: {
    DayEntry,
    EntryForm,
    FilterSortBar,
    Greeting
  },
  data() {
    return {
      formVisible: false,
      searchTerm: "",
      filters: [],
      entries: []
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.login();
    });
  },
  methods: {
    login() {
      const self = this;
      const uiConfig = {
        callbacks: {
          async signInSuccessWithAuthResult(authResults, redirectUrl) {
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
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("successfully logging out and updating store");
          store.commit("logUserOut");
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    getAllEntriesFromDatabase() {
      // const entriesRef = db.collection("entries");
      const privateEntriesRef = db
        .collection("users")
        .doc(this.userUID)
        .collection("entries");

      // console.log(privateEntriesRef);
      console.log("what is userUID", this.userUID);

      privateEntriesRef.get().then(querySnapshot => {
        const databaseEntries = [];
        querySnapshot.forEach(doc => {
          const entry = doc.data();
          entry.id = doc.id;
          databaseEntries.push(entry);
          console.log("ENTRY", entry);
        });
        this.entries = databaseEntries;
      });
    },
    toggleEntryForm() {
      this.formVisible = !this.formVisible;
    },
    searchQuery(query) {
      this.searchTerm = query;
    },
    addFilters(filters) {
      this.filters = filters.filter(item => item !== null && item.length > 0);
    }
  },
  computed: {
    showEntriesMatchingFilterCritera() {
      const filterCriteria = [].concat(...this.filters);
      if (this.searchTerm.length > 0 && this.filters.indexOf(this.searchTerm)) {
        filterCriteria.push(this.searchTerm);
      }

      if (filterCriteria.length > 0) {
        const matchedEntriesIds = [];
        filterCriteria.forEach(criteria => {
          this.entries.forEach(entry => {
            const itemIndex = matchedEntriesIds.findIndex(item => {
              return item === entry.id;
            });
            if (itemIndex === -1) {
              // console.log("not in it");
              for (let key in entry) {
                if (
                  typeof entry[key] === "string" &&
                  entry[key].includes(criteria)
                ) {
                  matchedEntriesIds.push(entry.id);
                }

                if (Array.isArray(entry[key])) {
                  entry[key].forEach(item => {
                    if (item.description.includes(criteria)) {
                      matchedEntriesIds.push(entry.id);
                    }
                  });
                }
              }
            }
          });
        });

        const matchedEntries = this.entries.filter(entry => {
          if (matchedEntriesIds.indexOf(entry.id) !== -1) {
            return true;
          }
        });

        return matchedEntries;
      } else {
        return this.entries;
      }
    },
    ...mapMutations(["logUserOut"]),
    ...mapState({
      user: state => {
        return state.user;
      },
      userUID: state => {
        console.log("trying to find userUID", state.user);
        return state.user.user.uid;
      }
    })
  }
};
</script>

<style scoped>
h1 {
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 4rem;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.no-entries p {
  margin: auto;
}

.header-bottom {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.non-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>