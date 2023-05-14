<template>
  <div id="app">
    <section class="todo-wrapper mr-3">
      <h1 class="todo-title">
        Встречи по проектам
      </h1>
      <form @keydown.enter.prevent="">
        <input
          type="text"
          class="input-todo"
          v-bind:class="{ active: new_meet }"
          placeholder="Дата встречи..."
          v-model="new_meet"
          v-on:keyup.enter="addItem"
        />
        <div
          class="btnn btnn-add"
          v-bind:class="{ active: new_meet }"
          @click="addItem"
        >
          +
        </div>
      </form>

      <div v-if="pending2.length > 0">
        <p class="status busy">
          У Вас имеется {{ pending2.length }} <span v-if="pending2.length > 1"> назначенные встречи
          </span> 
          <span v-if="pending2.length === 1"> назначенная встреча</span>
        </p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item2 in pending2" v-bind:key="item2.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item2_' + item2.id"
              v-model="item2.done"
              type="checkbox"
            />
            <label v-bind:for="'item2_' + item2.id"></label>
            <span class="todo-text">{{ item2.title }}</span>
            <span class="deleteT" @click="deleteItem(item2)"></span>
          </li>
        </transition-group>
      </div>

      <transition name="slide-fade">
        <p class="status free" v-if="!pending2.length">
          <img
            src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg"
            alt="celebration"
          />Никто не хочет встретиться? 😔
        </p>
      </transition>

      <div v-if="completed2.length > 0 && showComplete">
        <p class="status">Завершенные встречи: {{ completedPercentage }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item2 in completed2" v-bind:key="item2.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_2' + item2.id"
              v-model="item2.done"
              type="checkbox"
            />
            <label v-bind:for="'item_2' + item2.id"></label>
            <span class="todo-text">{{ item2.title }}</span>
            <span class="deleteT" @click="deleteItem(item2)"></span>
          </li>
        </transition-group>
      </div>
      <div class="control-buttons">
        <div
          class="btnn btnn-secondary"
          v-if="completed2.length > 0"
          @click="toggleShowComplete"
        >
          <span v-if="!showComplete">Показать</span
          ><span v-else>Скрыть</span> завершенные
        </div>
        <div
          class="btnn btnn-secondary"
          v-if="meetList.length > 0"
          @click="clearAll"
        >
          Очистить все
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Meeting",
  data() {
    return {
      meetList: [],
      new_meet: "",
      showComplete: false
    };
  },
  mounted() {
    this.getMeet();
  },
  watch: {
    meetList: {
      handler: function(updatedList2) {
        localStorage.setItem("meet_list", JSON.stringify(updatedList2));
      },
      deep: true
    }
  },
  computed: {
    pending2: function() {
      return this.meetList.filter(function(item2) {
        return !item2.done;
      });
    },
    completed2: function() {
      return this.meetList.filter(function(item2) {
        return item2.done;
      });
    },
    completedPercentage: function() {
      return (
        Math.floor((this.completed2.length / this.meetList.length) * 100) + "%"
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
    getMeet() {
      if (localStorage.getItem("meet_list")) {
        this.meetList = JSON.parse(localStorage.getItem("meet_list"));
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_meet) {
        this.meetList.unshift({
          id: this.meetList.length,
          title: this.new_meet,
          done: false
        });
      }
      // reset new_todo
      this.new_meet = "";
      // save the new item in localstorage
      return true;
    },
    deleteItem(item2) {
      this.meetList.splice(this.meetList.indexOf(item2), 1);
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.meetList = [];
    }
  }
};
</script>
