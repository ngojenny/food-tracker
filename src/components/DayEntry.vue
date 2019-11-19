<template>
  <div class="card">
    <p>
      <span class="entry-label">date:</span>
      {{date}}
    </p>
    <p>
      <span class="entry-label">food:</span>
    </p>
    <ul>
      <li v-for="food in foods" v-bind:key="food.id">{{food.description}}</li>
    </ul>
    <p>
      <span class="entry-label">gut:</span>
      {{gut}}
    </p>
    <p>
      <span class="entry-label">skin:</span>
      {{skin}}
    </p>
    <p>
      <span class="entry-label">tags:</span>
    </p>
    <ul>
      <li v-for="tag in tags" v-bind:key="tag.id">{{tag.description}}</li>
    </ul>
    <p>
      <span class="entry-label">notes:</span>
      {{notes}}
    </p>
  </div>
</template>

<script>
export default {
  props: ["date", "foods", "gut", "skin", "tags", "notes"]
};
</script>

<style scoped>
.card {
  border: 2px solid #ffffff;
  background: rgba(255, 255, 255, 0.4);
  padding: 15px;
  width: calc(33.3% - 15px);
  margin-bottom: 25px;
}

.entry-label {
  font-weight: 700;
  text-transform: capitalize;
  margin-right: 5px;
}

p,
ul {
  margin-bottom: 20px;
}

ul {
  margin-top: 0;
}
</style>