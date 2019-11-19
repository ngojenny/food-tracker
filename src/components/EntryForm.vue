<template>
  <div v-on:click="closeModal" class="modal">
    <form v-on:click.stop v-on:submit.prevent="sendEntry">
      <h2>New Entry</h2>
      <button v-on:click="closeModal" class="btn-close" type="button">x</button>
      <label for="date">Date:</label>
      <input type="text" id="date" v-model="currentEntry.date" />
      <label for="foodItem">Food:</label>
      <div v-if="currentEntry.foods.length > 0">
        <ul v-for="food in currentEntry.foods" v-bind:key="food.id">
          <li>{{food.description}}</li>
        </ul>
      </div>
      <div class="field-container">
        <input
          type="text"
          id="foodItem"
          v-model="currentEntry.foodItem"
          v-on:keyup.enter="addListItem"
        />
        <button class="btn-add-item" type="button" v-on:click="addListItem" data-item="foodItem">+</button>
      </div>
      <label for="gut">Gut:</label>
      <input type="text" id="gut" v-model="currentEntry.gut" />
      <label for="skin">Skin:</label>
      <input type="text" id="skin" v-model="currentEntry.skin" />
      <label for="tags">Tags:</label>
      <div v-if="currentEntry.tags.length > 0">
        <ul v-for="tag in currentEntry.tags" v-bind:key="tag.id">
          <li>{{tag.description}}</li>
        </ul>
      </div>
      <div class="field-container">
        <input
          type="text"
          id="tagItem"
          v-model="currentEntry.tagItem"
          v-on:keyup.enter="addListItem"
        />
        <button class="btn-add-item" type="button" v-on:click="addListItem" data-item="tagItem">+</button>
      </div>
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
      this.closeModal();
    },
    addListItem(e) {
      let item = e.target.dataset.item;
      if (!item) {
        item = e.target.id;
      }

      const pluralKey = item.split("Item")[0] + "s";
      const itemObj = {
        description: this.currentEntry[item],
        id: Date.now()
      };

      this.currentEntry[pluralKey].push(itemObj);

      console.log("this.currentEntry", this.currentEntry);
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
  width: 60%;
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  padding-top: 40px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

h2 {
  width: 100%;
  margin-top: 0;
  letter-spacing: 1px;
  font-size: 2.2rem;
}

label {
  font-size: 1.5rem;
  font-weight: 700;
}

input {
  width: 100%;
  margin-bottom: 15px;
  background: none;
  border: none;
  border-bottom: 1px dotted #2c3e50;
}

.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
}

.field-container {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.btn-add-item {
  border: none;
  background: none;
  margin-left: 5px;
  margin-right: -5px;
  line-height: 0;
  font-size: 2.8rem;
}
</style>