<template>
  <div class="card">
    <p>
      <span class="entry-label">date:</span>
      {{ formattedDate }}
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
  props: ["date", "foods", "gut", "skin", "tags", "notes"],
  computed: {
    formattedDate: function() {
      const { date } = this;
      if (typeof date === "string") {
        return date;
      }
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return formattedDate;
    }
  }
};
</script>

<style scoped>
.card {
  border: 2px solid #ffffff;
  background: rgba(255, 255, 255, 0.4);
  padding: 15px;
  width: calc((100% - 40px) / 3);
  margin: 10px;
}

.card:nth-of-type(3n + 1) {
  margin-left: 0;
}

.card:nth-of-type(3n) {
  margin-right: 0;
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