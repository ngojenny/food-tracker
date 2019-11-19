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
      <li v-for="food in foods" v-bind:key="food">{{food}}</li>
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
      <li v-for="tag in tags" v-bind:key="tag">{{tag}}</li>
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
  border: 1px solid #ffffff;
  background: rgba(255, 255, 255, 0.4);
  padding: 15px;
  width: calc(33.3% - 25px);
}

.entry-label {
  font-weight: 700;
  text-transform: capitalize;
  margin-right: 5px;
}

p,
ul {
  margin-bottom: 25px;
}
</style>