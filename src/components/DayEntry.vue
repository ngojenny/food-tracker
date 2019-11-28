<template>
  <div class="card">
    <div class="more-actions-container">
      <button class="btn-more-actions" v-on:click="toggleMoreActionsDropdown">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul v-if="dropdownVisible" class="more-actions-dropdown">
        <li>
          <button v-on:click.stop="editEntry">
            Edit
            <i class="fas fa-edit"></i>
          </button>
        </li>
        <li>
          <button v-on:click="toggleConfirmation">
            Delete
            <i class="fas fa-trash"></i>
          </button>
        </li>
      </ul>
    </div>
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
import { mapMutations } from "vuex";
import Confirm from "./Confirm";
import store from "./../store";
export default {
  props: ["date", "foods", "gut", "skin", "tags", "notes"],
  components: {
    Confirm
  },
  data() {
    return {
      dropdownVisible: false
    };
  },
  methods: {
    toggleMoreActionsDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    editEntry() {
      console.log("going to edit entry");
      this.toggleMoreActionsDropdown();
    },
    toggleConfirmation() {
      this.toggleMoreActionsDropdown();
      store.commit("toggleDeleteEntryConfirmation");
    }
  },
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
      const formattedDate = date.toDate().toLocaleString("en-US", options);
      return formattedDate;
    },
    ...mapMutations(["toggleDeleteEntryConfirmation"])
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
  position: relative;
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

.more-actions-container {
  position: absolute;
  right: 10px;
  top: 10px;
}

.btn-more-actions {
  border: none;
  background: none;
}

.fa-ellipsis-v {
  color: grey;
}

.more-actions-dropdown {
  background: rgba(255, 255, 255, 0.9);
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: left;
  position: absolute;
  z-index: 10;
}

.more-actions-dropdown button {
  background: none;
  border: none;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.more-actions-dropdown i {
  margin-left: 10px;
  font-size: 1.3rem;
  color: #2c3e50;
}
</style>