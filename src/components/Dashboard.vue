<template>
  <div class="wrapper">
    <header>
      <h1>Weekly Overview</h1>
      <button class="btn btn-add" type="button" v-on:click="toggleEntryForm">New Entry ✎</button>
    </header>
    <main>
      <FilterSortBar :entries="entries" @search-query="searchQuery" @add-filters="addFilters" />
      <div class="card-container">
        <!-- need to use something else for key -->
        <DayEntry
          v-for="entry in showEntriesMatchingFilterCritera"
          v-bind:key="entry.date"
          :date="entry.date"
          :foods="entry.foods"
          :gut="entry.gut"
          :skin="entry.skin"
          :tags="entry.tags"
          :notes="entry.notes"
        />
      </div>
      <EntryForm v-if="formVisible" @send-entry="addEntry" @close-modal="toggleEntryForm" />
    </main>
  </div>
</template>

<script>
import DayEntry from "./DayEntry.vue";
import EntryForm from "./EntryForm.vue";
import FilterSortBar from "./FilterSortBar.vue";
export default {
  name: "Dashboard",
  components: {
    DayEntry,
    EntryForm,
    FilterSortBar
  },
  data() {
    return {
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
    });
  },
  methods: {
    getAllEntriesFromDatabase() {
      console.log("gonna do some firebase things");
    },
    toggleEntryForm() {
      this.formVisible = !this.formVisible;
    },
    addEntry(val) {
      this.entries.push(val);
    },
    searchQuery(query) {
      this.searchTerm = query;
    },
    addFilters(filters) {
      this.filters = filters.filter(item => item !== null);
    }
  },
  computed: {
    showEntriesMatchingFilterCritera: function() {
      const filterCriteria = [].concat(...this.filters);
      if (this.searchTerm.length > 0 && this.filters.indexOf(this.searchTerm)) {
        filterCriteria.push(this.searchTerm);
      }

      if (filterCriteria.length > 0) {
        const matchedEntries = [];
        filterCriteria.forEach(criteria => {
          this.entries.forEach(entry => {
            // for now check for unique date, will need to generate some UID later
            const itemIndex = matchedEntries.findIndex(item => {
              return item.date === entry.date;
            });
            if (itemIndex === -1) {
              for (let key in entry) {
                if (entry[key].includes(criteria)) {
                  matchedEntries.push(entry);
                }

                if (Array.isArray(entry[key])) {
                  entry[key].forEach(item => {
                    if (item.description.includes(criteria)) {
                      matchedEntries.push(entry);
                    }
                  });
                }
              }
            }
          });
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
  /* justify-content: space-between; */
  flex-wrap: wrap;
}

header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
</style>