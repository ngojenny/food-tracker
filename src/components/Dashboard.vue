<template>
  <div class="wrapper">
    <header>
      <h1>Weekly Overview</h1>
      <button class="add-button" type="button" v-on:click="toggleEntryForm">New Entry ✎</button>
    </header>
    <main>
      <div class="card-container">
        <DayEntry
          v-for="seed in seeds"
          v-bind:key="seed.date"
          :date="seed.date"
          :foods="seed.foods"
          :gut="seed.gut"
          :skin="seed.skin"
          :tags="seed.tags"
          :notes="seed.notes"
        />
      </div>
      <EntryForm v-if="formVisible" @send-entry="addEntry" @close-modal="toggleEntryForm" />
    </main>
  </div>
</template>

<script>
import DayEntry from "./DayEntry.vue";
import EntryForm from "./EntryForm.vue";
export default {
  name: "Dashboard",
  components: {
    DayEntry,
    EntryForm
  },
  data() {
    return {
      formVisible: false,
      seeds: [
        {
          date: "Jan 1, 2019",
          foods: [
            { description: "oatmeal with milk", id: "seed1fooditem1" },
            { description: "apple", id: "seed1fooditem2" },
            { description: "cheeseburger", id: "seed1fooditem3" },
            { description: "chocolate bar", id: "seed1fooditem4" },
            { description: "spaghetti", id: "seed1fooditem5" }
          ],
          gut: "bloated by EOD",
          skin: "clear",
          tags: [
            { description: "bloated", id: "seed1tagitem1" },
            { description: "clear-skin", id: "seed1tagitem2" }
          ],
          notes: "started using new moisturizer"
        },
        {
          date: "Jan 2, 2019",
          foods: [
            { description: "eggs and bacon", id: "seed2fooditem1" },
            { description: "apple", id: "seed2fooditem2" },
            { description: "kale salad", id: "seed2fooditem3" },
            { description: "chocolate bar", id: "seed2fooditem4" },
            { description: "spaghetti", id: "seed2fooditem5" }
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: [
            { description: "bloated", id: "seed2tagitem1" },
            { description: "clear-skin", id: "seed2tagitem2" }
          ],
          notes: ""
        },
        {
          date: "Jan 3, 2019",
          foods: [
            { description: "eggs and bacon", id: "seed3fooditem1" },
            { description: "coffee", id: "seed3fooditem2" },
            { description: "banana", id: "seed3fooditem3" },
            { description: "chicken soup", id: "seed3fooditem4" },
            { description: "chocolate bar", id: "seed3fooditem5" },
            { description: "salmon and asparagus", id: "seed3fooditem6" }
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: [
            { description: "bloated", id: "seed3tagitem1" },
            { description: "clear-skin", id: "seed3tagitem2" }
          ],
          notes: ""
        }
      ]
    };
  },
  methods: {
    toggleEntryForm() {
      this.formVisible = !this.formVisible;
    },
    addEntry(val) {
      console.log("adding entry!", val);
      this.seeds.push(val);
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

.add-button {
  border: none;
  padding: 5px 10px;
  font-size: 1.8rem;
  background: #ffffff;
}

header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
</style>