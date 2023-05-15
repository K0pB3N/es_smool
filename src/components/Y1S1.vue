<template>
  <div id="app">
    <section class="todo-wrapper mr-3">
      <h1 class="todo-title">
        <b>1 семестр</b>
      </h1>
      <b-field>
        <b-autocomplete
          rounded
          v-model="new_impt"
          :data="filteredDataArray"
          placeholder="к примеру: Философия"
          clearable
          @select="option => (selected = option)"
          v-on:keyup.enter="addItem"
        >
          <template slot="empty">Результаты не найдены</template>
        </b-autocomplete>
      </b-field>
      <!-- <input type="text" class="input-todo" v-bind:class="{ active: new_impt }"
          placeholder="Exam Dates"
          v-model="new_impt"
          v-on:keyup.enter="addItem"
        /> -->
      <div class="d-flex justify-content-left">
        <div
          class="btnn btnn-add"
          v-bind:class="{ active: new_impt }"
          @click="addItem"
        >
          <h5 class="btn-text">Добавить дисциплину</h5>
        </div>
      </div>

      <div v-if="pending1.length > 0">
       <p class="status busy">
            У Вас {{ pending1.length }} <span v-if="pending1.length > 1"
              > дисциплин</span
            >
            <span v-if="pending1.length === 1"> дисциплина</span>
            в этом семестре
          </p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item1 in pending1" v-bind:key="item1.title">
            <label v-bind:for="'item_3' + item1.id"></label>
            <span class="todo-text">{{ item1.title }}</span>
            <span class="deleteT" @click="deleteItem(item1)"></span>
          </li>
        </transition-group>
      </div>

      <transition name="slide-fade">
        <p class="status free" v-if="!pending1.length">
          <img src="../../glassdoor/pusheen.gif" alt="celebration" />У Вас нет никаких дисциплин в этом семестре?
        </p>
      </transition>

      <div v-if="completed1.length > 0 && showComplete">
        <p class="status">Важные прошедшие даты</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item1 in completed1" v-bind:key="item1.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_3' + item1.id"
              v-model="item1.done"
              type="checkbox"
            />
            <label v-bind:for="'item_3' + item1.id"></label>
            <span class="todo-text">{{ item1.title }}</span>
            <span class="delete" @click="deleteItem(item1)"></span>
          </li>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script>
require("@//assets/styles/modplanner.css");

export default {
  name: "Important",
  data() {
    return {
      y1s1List: [],
      new_impt: "",
      showComplete: false,
      newItem: "",
      selected: null,
      mods: [
        "История",
        "Информатика",
        "Математический анализ",
        "Алгебра и геометрия",
        "Иностранный язык",
        "Физика",
        "Процедурное программирование",
        "Физическая культура"
      ]
    };
  },
  mounted() {
    this.getImpt();
  },
  watch: {
    y1s1List: {
      handler: function(updatedList1) {
        localStorage.setItem("y1s1_list", JSON.stringify(updatedList1));
      },
      deep: true
    }
  },
  computed: {
    filteredDataArray() {
      return this.mods.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.new_impt.toLowerCase()) >= 0
        );
      });
    },

    pending1: function() {
      return this.y1s1List.filter(function(item1) {
        return !item1.done;
      });
    },
    completed1: function() {
      return this.y1s1List.filter(function(item1) {
        return item1.done;
      });
    },
    completedPercentage: function() {
      return (
        Math.floor((this.completed1.length / this.y1s1List.length) * 100) + "%"
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
      if (localStorage.getItem("y1s1_list")) {
        this.y1s1List = JSON.parse(localStorage.getItem("y1s1_list"));
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_impt) {
        this.y1s1List.unshift({
          id: this.y1s1List.length,
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
      this.y1s1List.splice(this.y1s1List.indexOf(item1), 1);
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.y1s1List = [];
    }
  }
};
</script>

<style scoped>
.control.has-icons-right .icon.is-right {
  margin-top: 16px;
}
</style>
