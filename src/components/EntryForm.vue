<template>
  <form v-on:submit.prevent="sendEntry">
    <label for="date">Date:</label>
    <input type="text" id="date" v-on:keyup="updateField" />
    <label for="foodItem">Food:</label>
    <div v-if="currentEntry.foods.length > 0">
      <ul v-for="food in currentEntry.foods" v-bind:key="food">
        <li>{{food}}</li>
      </ul>
    </div>
    <input type="text" id="foodItem" v-on:keyup="updateField" />
    <button type="button" v-on:click="addFoodItem">+</button>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  props: ["addEntry"],
  data() {
    return {
      currentEntry: {
        date: "",
        foodItem: "",
        foods: [],
        gut: "",
        skin: "",
        tags: [],
        notes: ""
      }
    };
  },
  methods: {
    updateField(e) {
      const value = e.target.value;
      const id = e.target.id;
      this.currentEntry[id] = value;
    },
    sendEntry() {
      console.log("calling sendEntry", this.currentEntry);
      const massagedEntry = Object.assign({}, this.currentEntry);
      delete massagedEntry.foodItem;
      this.$emit("send-entry", this.currentEntry);
      this.currentEntry = {
        date: "",
        foodItem: "",
        foods: [],
        gut: "",
        skin: "",
        tags: [],
        notes: ""
      };
    },
    addFoodItem() {
      console.log("adding food item");
      this.currentEntry.foods.push(this.currentEntry.foodItem);
      this.currentEntry.foodItem = "";
    }
  }
};
</script>