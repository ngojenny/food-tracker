<template>
  <div class="container">
    <form v-on:submit.prevent="addFilters" class="filter">
      <div class="filter-dropdown">
        <label for="food">Food</label>
        <select name id="food" v-model="foodFilter">
          <option value>All</option>
          <option v-for="food in allFoodItems" v-bind:key="food" :value="food">{{food}}</option>
        </select>
      </div>
      <div class="filter-dropdown">
        <label for="tags">Tags</label>
        <select name id="tag" v-model="tagFilter">
          <option value>All</option>
          <option v-for="tag in allTagItems" v-bind:key="tag" :value="tag">{{tag}}</option>
        </select>
      </div>
      <button class="btn" type="submit">filter</button>
    </form>
    <form v-on:submit.prevent="searchQuery" class="search">
      <label for="search" class="visuallyhidden">Search</label>
      <input type="search" placeholder="Search" v-model="search" />
      <button class="btn" type="submit">Search</button>
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
      search: "",
      foodFilter: null,
      tagFilter: null
    };
  },
  methods: {
    addFilters: function() {
      this.$emit("add-filters", [this.foodFilter, this.tagFilter]);
    },
    searchQuery: function() {
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

select,
input[type="search"] {
  appearance: none;
  background: transparent;
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #2c3e50;
  background: url("../assets/caret-down-solid.svg");
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 12px;
  padding: 5px;
  margin: 0 5px;
}

input[type="search"] {
  background-image: url("../assets/search-solid.svg");
  background-size: 15px;
}
</style>