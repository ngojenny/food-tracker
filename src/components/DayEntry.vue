<template>
  <div class="card">
    <p>
      <span class="entry-label">date:</span>
      {{date}}
    </p>
    <p>
      <span class="entry-label">food:</span>
    </p>
    <ul v-for="food in foods" v-bind:key="food">
      <li>{{food}}</li>
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
    <ul v-for="tag in tags" v-bind:key="tag">
      <li>{{tag}}</li>
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