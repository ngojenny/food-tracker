<template>
  <div class="wrapper">
    <header class="non-auth">
      <h1>Food Diary</h1>
      <p>Find relationships between your food, gut and skin</p>
      <div class="firebase-list" id="firebaseui-auth-container"></div>
    </header>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(function() {
      this.$emit("promptLogin");
    });
  }
};
</script>

<style scoped>
.non-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>