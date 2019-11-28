<template>
  <div v-on:click="closeModal" class="modal">
    <form v-on:click.stop v-on:submit.prevent="sendEntry">
      <h2>New Entry</h2>
      <button v-on:click="closeModal" class="btn-close" type="button">x</button>
      <label for="date">Date:</label>
      <DatePicker id="date" class="datepicker" v-model="currentEntry.date" />
      <label for="foodItem">Food:</label>
      <div v-if="currentEntry.foods.length > 0">
        <ul>
          <li v-for="food in currentEntry.foods" v-bind:key="food.id">
            {{food.description}}
            <button
              type="button"
              :data-id="food.id"
              data-collection="foods"
              v-on:click="removeListItem"
              class="btn-manage-item"
            >-</button>
          </li>
        </ul>
      </div>
      <div class="field-container">
        <input
          type="text"
          id="foodItem"
          v-model="currentEntry.foodItem"
          v-on:keydown.enter="addListItem"
        />
        <button
          class="btn-manage-item"
          type="button"
          v-on:click="addListItem"
          data-item="foodItem"
        >+</button>
      </div>
      <label for="gut">Gut:</label>
      <input type="text" id="gut" v-model="currentEntry.gut" v-on:keydown.enter.prevent />
      <label for="skin">Skin:</label>
      <input type="text" id="skin" v-model="currentEntry.skin" v-on:keydown.enter.prevent />
      <label for="tags">Tags:</label>
      <div v-if="currentEntry.tags.length > 0">
        <ul>
          <li v-for="tag in currentEntry.tags" v-bind:key="tag.id">
            {{tag.description}}
            <button
              type="button"
              :data-id="tag.id"
              data-collection="tags"
              v-on:click="removeListItem"
              class="btn-manage-item"
            >-</button>
          </li>
        </ul>
      </div>
      <div class="field-container">
        <input
          type="text"
          id="tagItem"
          v-model="currentEntry.tagItem"
          v-on:keydown.enter="addListItem"
        />
        <button class="btn-manage-item" type="button" v-on:click="addListItem" data-item="tagItem">+</button>
      </div>
      <label for="note">Note:</label>
      <input type="text" id="note" v-model="currentEntry.notes" v-on:keydown.enter.prevent />
      <button class="btn" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import { db } from "./../firebase";
export default {
  props: ["addEntry"],
  components: {
    DatePicker
  },
  data() {
    return {
      currentEntry: {
        date: new Date(),
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
    sendEntry(e) {
      const entryRef = db
        .collection("users")
        .doc(this.userUID)
        .collection("entries")
        .doc();

      const massagedEntry = Object.assign({}, this.currentEntry);
      delete massagedEntry.foodItem;
      delete massagedEntry.tagItem;
      this.$emit("database-updated");
      this.currentEntry = {
        date: new Date(),
        foodItem: "",
        foods: [],
        gut: "",
        skin: "",
        tags: [],
        notes: ""
      };
      entryRef.set(massagedEntry);
      this.closeModal();
    },
    addListItem(e) {
      e.preventDefault();
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

      this.currentEntry[item] = "";
    },
    removeListItem(e) {
      const itemId = e.target.dataset.id;
      const collection = e.target.dataset.collection;
      console.log("removing item", itemId, this.currentEntry.foods);
      const targetCollection = this.currentEntry[collection];
      console.log("what is target", targetCollection);
      const newCollection = targetCollection.filter(item => {
        console.log("item", item);
        return item.id !== parseInt(itemId);
      });

      console.log("what is newCollection", newCollection);

      this.currentEntry[collection] = newCollection;
      console.log("what are you", this.currentEntry);
    },
    closeModal() {
      this.$emit("close-modal");
    }
  },
  computed: {
    ...mapState({
      userUID: state => {
        return state.user.user.uid;
      }
    })
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
  background: none;
  font-size: 2.3rem;
  transform: scaleX(1.2);
  border: none;
}

.field-container {
  display: flex;
  align-items: baseline;
  width: 100%;
}

.btn-manage-item {
  border: none;
  background: none;
  margin-left: 5px;
  margin-right: -5px;
  line-height: 0;
  font-size: 2.8rem;
}

ul {
  margin-top: 30px;
  padding-left: 10px;
}

button[type="submit"] {
  margin: 10px auto;
}

.datepicker {
  width: 100%;
  border-radius: 0;
  border-bottom: 1px dotted #2c3e50;
}
</style>