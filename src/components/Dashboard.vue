<template>
  <div class="wrapper">
    <h2>Dashboard {{text}}</h2>
    <div v-for="seed in seeds" v-bind:key="seed.date">
      <DayEntry
        :date="seed.date"
        :foods="seed.foods"
        :gut="seed.gut"
        :skin="seed.skin"
        :tags="seed.tags"
        :notes="seed.notes"
      />
    </div>
    <button type="button" v-on:click="toggleEntryForm">New Entry</button>
    <EntryForm v-if="formVisible" @send-entry="addEntry" />
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
      text: "Component",
      formVisible: false,
      seeds: [
        {
          date: "Jan 1, 2019",
          foods: [
            "oatmeal with milk",
            "apple",
            "cheeseburger",
            "chocolate bar",
            "spaghetti"
          ],
          gut: "bloated by EOD",
          skin: "clear",
          tags: ["bloated", "clear-skin"],
          notes: "started using new moisturizer"
        },
        {
          date: "Jan 2, 2019",
          foods: [
            "eggs and bacon",
            "apple",
            "kale salad",
            "chocolate bar",
            "spaghetti"
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: ["bloated", "clear-skin"],
          notes: ""
        },
        {
          date: "Jan 3, 2019",
          foods: [
            "eggs and bacon",
            "coffee",
            "banana",
            "chicken soup",
            "chocolate bar",
            "salmon and asparagus"
          ],
          gut: "bloated by EOD",
          skin: "mild acne",
          tags: ["bloated", "clear-skin"],
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