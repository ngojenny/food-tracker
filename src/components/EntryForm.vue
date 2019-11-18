<template>
  <form v-on:submit.prevent="sendEntry">
    <label for="date">
      Date:
      <input type="text" id="date" v-on:change="updateField" />
    </label>
    <label for="foods">
      Food:
      <input type="text" id="foods" v-on:change="updateField" />
    </label>

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
      this.$emit("send-entry", this.currentEntry);
    }
  }
};
</script>