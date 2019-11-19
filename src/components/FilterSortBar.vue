<template>
  <div class="container">
    <h2>Filter by:</h2>
    <select name id>
      <option v-for="food in allFoodItems" v-bind:key="food" value="food">{{food}}</option>
    </select>
    <!-- <pre>
      {{allFoodItems}}
    </pre>-->
  </div>
</template>
<script>
export default {
  props: ["entries"],
  computed: {
    allFoodItems: function() {
      const allFoodItems = this.entries.map(entry => {
        return entry.foods.map(arr => arr.description);
      });
      const allFoodDesc = [].concat(...allFoodItems).filter((val, i, arr) => {
        return arr.indexOf(val) === i;
      });
      return allFoodDesc;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
</style>