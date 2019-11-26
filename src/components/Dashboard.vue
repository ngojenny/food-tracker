<template>
  <div v-if="user" class="wrapper">
    <header>
      <h1>Weekly Overview</h1>
      <div class="btn-container">
        <button class="btn btn-add" type="button" v-on:click="toggleEntryForm">New Entry ✎</button>
        <button class="btn" v-on:click="logout">Log out</button>
      </div>
    </header>
    <main>
      <FilterSortBar :entries="entries" @search-query="searchQuery" @add-filters="addFilters" />
      <Counter />
      <div class="card-container">
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
import DayEntry from "./DayEntry.vue";
import EntryForm from "./EntryForm.vue";
import FilterSortBar from "./FilterSortBar.vue";
import Counter from "./Counter.vue";
import firebase, { db, ui } from "./../firebase";
export default {
  name: "Dashboard",
  components: {
    DayEntry,
    EntryForm,
    FilterSortBar,
    Counter
  },
  data() {
    return {
      user: null,
      formVisible: false,
      searchTerm: "",
      filters: [],
      entries: [
        {
          date: "Jan 1, 2019",
          foods: [
            { description: "oatmeal with milk", id: "entry1fooditem1" },
            { description: "apple", id: "entry1fooditem2" },
            { description: "cheeseburger", id: "entry1fooditem3" },
            { description: "chocolate bar", id: "entry1fooditem4" },
            { description: "spaghetti", id: "entry1fooditem5" }
          ],
          gut: "bloated by EOD",
          skin: "clear",
          tags: [
            { description: "bloated", id: "entry1tagitem1" },
            { description: "clear-skin", id: "entry1tagitem2" }
          ],
          notes: "started using new moisturizer"
        },
        {
          date: "Jan 2, 2019",
          foods: [
            { description: "eggs and bacon", id: "entry2fooditem1" },
            { description: "apple", id: "entry2fooditem2" },
            { description: "kale salad", id: "entry2fooditem3" },
            { description: "chocolate bar", id: "entry2fooditem4" },
            { description: "spaghetti", id: "entry2fooditem5" }
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: [
            { description: "bloated", id: "entry2tagitem1" },
            { description: "clear-skin", id: "entry2tagitem2" }
          ],
          notes: ""
        },
        {
          date: "Jan 3, 2019",
          foods: [
            { description: "eggs and bacon", id: "entry3fooditem1" },
            { description: "coffee", id: "entry3fooditem2" },
            { description: "banana", id: "entry3fooditem3" },
            { description: "chicken soup", id: "entry3fooditem4" },
            { description: "chocolate bar", id: "entry3fooditem5" },
            { description: "salmon and asparagus", id: "entry3fooditem6" }
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: [
            { description: "bloated", id: "entry3tagitem1" },
            { description: "clear-skin", id: "entry3tagitem2" }
          ],
          notes: ""
        }
      ]
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getAllEntriesFromDatabase();
      this.login();
    });
  },
  methods: {
    login() {
      const self = this;
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult(authResults, redirectUrl) {
            self.user = authResults;
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
      this.user = null;
    },
    getAllEntriesFromDatabase() {
      const entriesRef = db.collection("entries");

      entriesRef.get().then(querySnapshot => {
        const databaseEntries = [];
        querySnapshot.forEach(doc => {
          const entry = doc.data();
          entry.id = doc.id;
          databaseEntries.push(entry);
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
    showEntriesMatchingFilterCritera: function() {
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
    }
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

header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.non-auth {
  flex-direction: column;
  align-items: center;
}
</style>