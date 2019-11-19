<template>
  <div v-on:click="closeModal" class="modal">
    <form v-on:submit.prevent="sendEntry">
      <button v-on:click="closeModal" class="btn-close" type="button">x</button>
      <label for="date">Date:</label>
      <input type="text" id="date" v-on:keyup="updateField" />
      <label for="foodItem">Food:</label>
      <div v-if="currentEntry.foods.length > 0">
        <ul v-for="food in currentEntry.foods" v-bind:key="food">
          <li>{{food}}</li>
        </ul>
      </div>
      <input type="text" id="foodItem" v-on:keyup="updateField" />
      <button type="button" v-on:click="addListItem" data-item="foodItem">+</button>
      <label for="gut">Gut:</label>
      <input type="text" id="gut" v-on:keyup="updateField" />
      <label for="skin">Skin:</label>
      <input type="text" id="skin" v-on:keyup="updateField" />
      <label for="tags">Tags:</label>
      <div v-if="currentEntry.tags.length > 0">
        <ul v-for="tag in currentEntry.tags" v-bind:key="tag">
          <li>{{tag}}</li>
        </ul>
      </div>
      <input type="text" id="tagItem" v-on:keyup="updateField" />
      <button type="button" v-on:click="addListItem" data-item="tagItem">+</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["addEntry"],
  data() {
    return {
      currentEntry: {
        date: "",
        foodItem: "",
        foods: [],
        gut: "",
        skin: "",
        tagItem: "",
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
      const massagedEntry = Object.assign({}, this.currentEntry);
      delete massagedEntry.foodItem;
      delete massagedEntry.tagItem;
      this.$emit("send-entry", this.currentEntry);
      this.currentEntry = {
        date: "",
        foodItem: "",
        foods: [],
        gut: "",
        skin: "",
        tags: [],
        notes: ""
      };
    },
    addListItem(e) {
      const item = e.target.dataset.item;
      const val = e.target.value;

      const pluralKey = item.split("Item")[0] + "s";

      this.currentEntry[pluralKey].push(this.currentEntry[item]);
    },
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
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

form {
  /* border: 1px solid tomato; */
  width: 60%;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  padding-top: 50px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

label {
  font-size: 1.5rem;
}

input {
  width: 100%;
  margin-bottom: 10px;
  background: none;
  border: none;
  border-bottom: 1px dotted #2c3e50;
}

.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>