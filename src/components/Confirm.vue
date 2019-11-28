<template>
  <div class="modal">
    <div class="confirmation-box">
      <p>Are you sure you want to delete this entry?</p>
      <div class="btn-container">
        <button class="btn" v-on:click="confirmAction">Yes</button>
        <button class="btn" v-on:click="toggleConfirmation">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    confirmAction() {
      console.log("gonna confirm");
      this.$emit("confirm-action");
    },
    toggleConfirmation() {
      const userUID = this.$route.params.id;
      this.$router.push(`/${userUID}`);
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 1px;
  background-image: linear-gradient(
    to top right,
    rgba(250, 224, 217, 0.9) 0%,
    rgba(255, 231, 255, 0.9) 100%
  );
  display: flex;
}

.confirmation-box {
  width: 60%;
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  padding-top: 40px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
</style>