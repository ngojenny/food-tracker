<template>
  <div class="container">
    <div class="filter">
      <div class="filter-dropdown">
        <label for="food">Food</label>
        <select name id="food">
          <option value>All</option>
          <option v-for="food in allFoodItems" v-bind:key="food" value="food">{{food}}</option>
        </select>
      </div>
      <div class="filter-dropdown">
        <label for="tags">Tags</label>
        <select name id="tag">
          <option value>All</option>
          <option v-for="tag in allTagItems" v-bind:key="tag" value="tag">{{tag}}</option>
        </select>
      </div>
      <button type="button">filter</button>
    </div>
    <form v-on:submit.prevent="searchQuery" class="search">
      <label for="search" class="visuallyhidden">Search</label>
      <input type="search" placeholder="Search" v-model="search" />
      <button type="submit">Search</button>
    </form>
    <!-- <pre>
      {{allFoodItems}}
    </pre>-->
  </div>
</template>
<script>
export default {
  props: ["entries"],
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchQuery: function() {
      console.log("calling search");
      this.$emit("search-query", this.search);
    }
  },
  computed: {
    allFoodItems: function() {
      const allFoodItems = this.entries.map(entry => {
        return entry.foods.map(arr => arr.description);
      });
      const allFoodDesc = [].concat(...allFoodItems).filter((val, i, arr) => {
        return arr.indexOf(val) === i;
      });
      return allFoodDesc.sort();
    },
    allTagItems: function() {
      const allTagItems = this.entries.map(entry => {
        return entry.tags.map(arr => arr.description);
      });
      const allTagDesc = [].concat(...allTagItems).filter((val, i, arr) => {
        return arr.indexOf(val) === i;
      });
      return allTagDesc.sort();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.filter {
  display: flex;
  align-items: baseline;
}
</style>