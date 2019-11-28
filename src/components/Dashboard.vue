<template>
  <div>
    <Account />
    <div class="wrapper">
      <header>
        <div class="header-bottom">
          <h1>Weekly Overview</h1>
          <div class="btn-container">
            <button class="btn btn-add" type="button" v-on:click="toggleEntryForm">New Entry ✎</button>
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
        <Confirm v-if="confirmVisible" />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DayEntry from "./DayEntry.vue";
import EntryForm from "./EntryForm.vue";
import FilterSortBar from "./FilterSortBar.vue";
import Account from "./Account.vue";
import Confirm from "./Confirm.vue";
import { db } from "./../firebase";
export default {
  name: "Dashboard",
  components: {
    DayEntry,
    EntryForm,
    FilterSortBar,
    Account,
    Confirm
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
      this.getAllEntriesFromDatabase();
    });
  },
  methods: {
    getAllEntriesFromDatabase() {
      const privateEntriesRef = db
        .collection("users")
        .doc(this.userUID)
        .collection("entries");

      privateEntriesRef.get().then(querySnapshot => {
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
    ...mapState({
      userUID: state => {
        return state.user.user.uid;
      },
      confirmVisible: state => {
        return state.deleteEntryConfirmationVisible;
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
</style>