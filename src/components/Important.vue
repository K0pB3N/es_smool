<template>
  <div id="app" class="important">
    <section class="todo-wrapper mr-3">
      <h1 class="todo-title">
        Важные даты
      </h1>
      <form @keydown.enter.prevent="">
        <input
          type="text"
          class="input-todo"
          v-bind:class="{ active: new_impt }"
          placeholder="Даты экзаменов, зачетов..."
          v-model="new_impt"
          v-on:keyup.enter="addItem"
        />
        <div
          class="btnn btnn-add"
          v-bind:class="{ active: new_impt }"
          @click="addItem"
        >
          +
        </div>
      </form>

      <div v-if="pending1.length > 0">
        <p class="status busy">
          У Вас {{ pending1.length
          }}<span v-if="pending1.length > 1"> важные даты</span>
          <span v-if="pending1.length === 1"> важная дата</span>
        </p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item1 in pending1" v-bind:key="item1.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_1' + item1.id"
              v-model="item1.done"
              type="checkbox"
            />
            <label v-bind:for="'item_1' + item1.id"></label>
            <span class="todo-text">{{ item1.title }}</span>
            <span class="deleteT" @click="deleteItem(item1)"></span>
          </li>
        </transition-group>
      </div>

      <transition name="slide-fade">
        <p class="status free" v-if="!pending1.length">
          <img
            src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg"
            alt="celebration"
          />Вы свободны, как птичка! 🐤
        </p>
      </transition>

      <div v-if="completed1.length > 0 && showComplete">
        <p class="status">Прошедшие важные даты</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item1 in completed1" v-bind:key="item1.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_1' + item1.id"
              v-model="item1.done"
              type="checkbox"
            />
            <label v-bind:for="'item_1' + item1.id"></label>
            <span class="todo-text">{{ item1.title }}</span>
            <span class="delete" @click="deleteItem(item1)"></span>
          </li>
        </transition-group>
      </div>
      <div class="control-buttons">
        <div
          class="btnn btnn-secondary"
          v-if="completed1.length > 0"
          @click="toggleShowComplete"
        >
          <span v-if="!showComplete">Показать</span
          ><span v-else>Скрыть</span> завершенные
        </div>
        <div
          class="btnn btnn-secondary"
          v-if="imptList.length > 0"
          @click="clearAll"
        >
          Clear All
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Important",
  data() {
    return {
      imptList: [],
      new_impt: "",
      showComplete: false
    };
  },
  mounted() {
    this.getImpt();
  },
  watch: {
    imptList: {
      handler: function(updatedList1) {
        localStorage.setItem("impt_list", JSON.stringify(updatedList1));
      },
      deep: true
    }
  },
  computed: {
    pending1: function() {
      return this.imptList.filter(function(item1) {
        return !item1.done;
      });
    },
    completed1: function() {
      return this.imptList.filter(function(item1) {
        return item1.done;
      });
    },
    completedPercentage: function() {
      return (
        Math.floor((this.completed1.length / this.imptList.length) * 100) + "%"
      );
    },
    today: function() {
      var weekday = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье"
      ];
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = {
        day: weekday[today.getDay()],
        date: dd + "/" + mm + "/" + yyyy
      };

      return today;
    }
  },
  methods: {
    // get all todos when loading the page
    getImpt() {
      if (localStorage.getItem("impt_list")) {
        this.imptList = JSON.parse(localStorage.getItem("impt_list"));
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_impt) {
        this.imptList.unshift({
          id: this.imptList.length,
          title: this.new_impt,
          done: false
        });
      }
      // reset new_todo
      this.new_impt = "";
      // save the new item in localstorage
      return true;
    },
    deleteItem(item1) {
      this.imptList.splice(this.imptList.indexOf(item1), 1);
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.imptList = [];
    }
  }
};
</script>

<style scoped>
.important {
  height: 95% !important;
}
</style>
