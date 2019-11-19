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
    <button type="button" v-on:click="addListItem" data-item="foodItem">+</button>
    <label for="gut">Gut:</label>
    <input type="text" id="gut" v-on:keyup="updateField" />
    <label for="skin">Skin:</label>
    <input type="text" id="skin" v-on:keyup="updateField" />
    <label for="tags">Tags:</label>
    <div v-if="currentEntry.tags.length > 0">
      <ul v-for="tag in currentEntry.tags" v-bind:key="tag">
        <li>{{tag}}</li>
      </ul>
    </div>
    <input type="text" id="tagItem" v-on:keyup="updateField" />
    <button type="button" v-on:click="addListItem" data-item="tagItem">+</button>
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
        tagItem: "",
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
      delete massagedEntry.tagItem;
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
    addListItem(e) {
      const item = e.target.dataset.item;
      const val = e.target.value;

      const pluralKey = item.split("Item")[0] + "s";

      this.currentEntry[pluralKey].push(this.currentEntry[item]);
    }
  }
};
</script>