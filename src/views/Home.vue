<template>
  <div>
    <Navbar :meeting="meeting" />
    <div class="container-fluid" ref="content">
      <b-row class="d-sm-flex justify-content-sm-center">
        <b-col sm="9" cols="12">
          <b-row>
            <b-row class="mt-3" style="margin-left: 0.1rem;">
              <b-col sm="12" lg="12" md="12" xl="6" cols="12">
                <div class="box height24 mx-auto">
                  <h5 class="particletext hearts" style="font-size: 1.5em">
                    <span id="username">Здравствуй, {{ username }}! 🙂</span>
                  </h5>
                  <QuoteBar />
                </div>
              </b-col>
              <b-col sm="12" lg="12" md="12" xl="6" cols="12">
                <div class="box height24 mx-auto">
                  <div class="scroll d-lg-flex justify-content-lg-between">
                    <div v-if="completedPercentage >= 100">
                      <h5 class="particle-text mb-2">
                        Ваша продуктивность поражает ⭐️
                      </h5>
                      <div class="particletext confetti">
                        <img
                          src="../../glassdoor/new_job_search/pusheen/4.gif"
                          style="width: 5rem;"
                        />
                        <span class="ml-2" style="font-size: 1.5rem;"
                          >Все выполнено! 🎉🎉
                        </span>
                      </div>
                    </div>
                    <div
                      v-else-if="
                        completedPercentage >= 80 && completedPercentage <= 99
                      "
                    >
                      <h5 class="mb-2 particletext">
                        Ваша продуктивность поражает ⭐️
                      </h5>
                      <div class="message">
                        <img
                          src="../../cards/image/7.gif"
                          style="width: 4rem;"
                          class="mr-2"
                        />
                        <span style="font-size: 1.5rem;"
                          >Ещё чуть-чуть! 🌟</span
                        >
                      </div>
                    </div>
                    <div
                      v-else-if="
                        completedPercentage >= 50 && completedPercentage <= 79
                      "
                    >
                      <h5 class="mb-2 particletext">
                        Ваша продуктивность поражает ⭐️
                      </h5>
                      <div class="message">
                        <img
                          src="../../cards/image/8.gif"
                          style="width: 4rem;"
                          class="mr-2"
                        /><span style="font-size: 1.3rem;"
                          >Продолжайте в том же духе! 🤩</span
                        >
                      </div>
                    </div>
                    <div
                      v-else-if="
                        completedPercentage >= 1 && completedPercentage <= 49
                      "
                    >
                      <h5 class="mb-2 particletext">
                        Ваша продуктивность поражает ⭐️
                      </h5>
                      <div class="message">
                        <img
                          src="../../cards/image/6.gif"
                          style="width: 4rem;"
                          class="mr-2"
                        /><span style="font-size: 1.5rem;"
                          >Вы можете лучше! 💪🏻</span
                        >
                      </div>
                    </div>
                    <div v-else-if="completedPercentage == 0">
                      <h5 class="mb-2 particletext">
                        <!-- Ваша продуктивность поражает ⭐️ -->
                      </h5>
                      <div class="message">
                        <img
                          src="../../cards/image/1.gif"
                          style="width: 5rem;"
                        /><span style="font-size: 1.5rem;"
                          >Вы в порядке? 🤡 🤡</span
                        >
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <vue-ellipse-progress
                        :is="component"
                        :progress="completedPercentage"
                        color="#7579ff"
                        empty-color="#324c7e"
                        :size="150"
                        :thickness="5"
                        :empty-thickness="3"
                        lineMode="in 4"
                        :legend-value="completed.length"
                        animation="bounce 700 1000"
                        fontSize="1.5rem"
                        font-color="black"
                        dot="7 black"
                      >
                        <span slot="legend-value"> / {{ newList.length }}</span>
                        <span slot="legend-caption">ЗАДАЧИ ВЫПОЛНЕНЫ</span>
                      </vue-ellipse-progress>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>

            <div>
              <vue-draggable-resizable
                :draggable="false"
                class="whiteboard"
                w="auto"
                h="auto"
              >
                <vue-draggable-resizable
                  class="first"
                  w="350"
                  h="400"
                  :lock-aspect-ratio="false"
                  :max-height="400"
                  :resizable="true"
                  id="app"
                  :snap="true"
                  :snapTolerance="10"
                  @refLineParams="getRefLineParams"
                >
                  <section class="todo-wrapper mr-3 cont">
                    <h1 class="todo-title">
                      Список дел
                    </h1>
                    <form @keydown.enter.prevent="">
                      <input
                        type="text"
                        class="input-todo"
                        v-bind:class="{ active: new_item }"
                        placeholder="Дз поделать, что ли..."
                        v-model="new_item"
                        v-on:keyup.enter="addItem"
                      />
                      <div
                        class="btnn btnn-add"
                        v-bind:class="{ active: new_item }"
                        @click="addItem"
                      >
                        +
                      </div>
                    </form>

                    <div v-if="pending.length > 0">
                      <p class="status busy">
                        У Вас {{ pending.length
                        }}<span v-if="pending.length > 1"> отложеных дела</span>
                        <span v-if="pending.length === 1">
                          отложенное дело</span
                        >
                      </p>
                      <transition-group
                        name="todo-item"
                        tag="ul"
                        class="todo-list"
                      >
                        <li v-for="item in pending" v-bind:key="item.title">
                          <input
                            class="todo-checkbox"
                            v-bind:id="'item_' + item.id"
                            v-model="item.done"
                            type="checkbox"
                            @click="addTaskDone"
                          />
                          <label v-bind:for="'item_' + item.id"></label>
                          <span class="todo-text">{{ item.title }}</span>
                          <span
                            class="deleteT"
                            @click="deleteItem(item)"
                          ></span>
                        </li>
                      </transition-group>
                    </div>

                    <transition name="slide-fade">
                      <p class="status free" v-if="!pending.length">
                        <img
                          src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg"
                          alt="celebration"
                        />Можно расслабиться! Дел больше нет.
                      </p>
                    </transition>

                    <div v-if="completed.length > 0 && showComplete">
                      <p class="status">
                        Завершенные задачи:
                      </p>
                      <transition-group
                        name="todo-item"
                        tag="ul"
                        class="todo-list archived"
                      >
                        <li v-for="item in completed" v-bind:key="item.title">
                          <input
                            class="todo-checkbox"
                            v-bind:id="'item_' + item.id"
                            v-model="item.done"
                            type="checkbox"
                          />
                          <label v-bind:for="'item_' + item.id"></label>
                          <span class="todo-text">{{ item.title }}</span>
                          <span class="delete" @click="deleteItem(item)"></span>
                        </li>
                      </transition-group>
                    </div>
                    <div class="control-buttons">
                      <div
                        class="btnn btnn-secondary"
                        v-if="completed.length > 0"
                        @click="toggleShowComplete"
                      >
                        <span v-if="!showComplete">Показать</span
                        ><span v-else>Скрыть</span>
                        завершенные
                      </div>
                      <div
                        class="btnn btnn-secondary"
                        v-if="newList.length > 0"
                        @click="clearAll"
                      >
                        Очистить все
                      </div>
                    </div>
                  </section>
                </vue-draggable-resizable>
                <!-- End todo-->
                <vue-draggable-resizable
                  class="second"
                  :resizable="true"
                  :lock-aspect-ratio="false"
                  w="350"
                  h="400"
                  :snap="true"
                  :snapTolerance="10"
                  :isConflictCheck="true"
                  @refLineParams="getRefLineParams"
                  ><Important
                /></vue-draggable-resizable>
                <vue-draggable-resizable
                  class="third"
                  :resizable="true"
                  :lock-aspect-ratio="false"
                  w="350"
                  h="400"
                  :x="x"
                  v-on:data="meeting"
                  :snap="true"
                  :snapTolerance="10"
                  :isConflictCheck="true"
                  @refLineParams="getRefLineParams"
                  ><Meeting
                /></vue-draggable-resizable>
              </vue-draggable-resizable>
            </div>
          </b-row>
        </b-col>
        <b-col sm="12" md="12" lg="12" xl="3" cols="12">
          <div class="box mt-3" id="schedule">
            <div class="d-flex align-items-center flex-column">
              <h4 class="particletext mb-4 text-center">
                Направление<br />и<br />изучаемые дисциплины ✏️
              </h4>
              <ModuleCard
                v-for="mod in modules"
                :key="mod"
                v-bind:moduleFullName="mod"
              />
              <ModuleCard
                v-for="less in sub"
                :key="less"
                v-bind:groupes="mod"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Important from "@/components/Important";
import Meeting from "@/components/Meeting";
import ModuleCard from "@/components/ModuleCard";
import Navbar from "@/components/Navbar";
import QuoteBar from "@/components/QuoteBar";
import Schedule from "@/components/Schedule";
import $ from "jquery";
import VueDraggableResizable from "vue-draggable-resizable-gorkys";
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";
require("@/assets/styles/particles.css");
require("@/assets/styles/todo.css");

export default {
  name: "Home",
  components: {
    VueDraggableResizable,
    Navbar,
    QuoteBar,
    ModuleCard,
    Important,
    Meeting,
    Schedule
  },
  data() {
    return {
      name: "Guest",
      meeting: "meeting 24",
      tasksDone: 0,
      tasksTodo: 0,
      modules: [],
      newList: [],
      new_item: "",
      sub: [],
      showComplete: false,
      username: "",
      vLine: [],
      hLine: []
    };
  },
  methods: {
    getNew() {
      if (localStorage.getItem("new_list")) {
        this.newList = JSON.parse(localStorage.getItem("new_list"));
      }
    },

    addTaskDone() {
      this.tasksDone++;
    },

    // add a new item
    addItem() {
      // validation check
      if (this.new_item) {
        this.newList.unshift({
          id: this.newList.length,
          title: this.new_item,
          done: false
        });
      }
      // reset new_todo
      this.new_item = "";
      // save the new item in localstorage
      return true;
    },
    deleteItem(item) {
      this.newList.splice(this.newList.indexOf(item), 1);
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.newList = [];
    },
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      this.vLine = vLine;
      this.hLine = hLine;
    }
    // onDragCallback(x, y) {
    //   console.log(this.x);
    //   if (x > 100 && x < 400 && y > 100 && y < 400) {
    //     return false;
    //   }
    // }
  },
  computed: {
    tasksDonePercent() {
      if (this.tasksTodo == 0) {
        return 0;
      }
      return (this.tasksDone * 100) / this.tasksTodo;
    },
    component() {
      return "vue-ellipse-progress";
    },
    pending: function() {
      return this.newList.filter(function(item) {
        return !item.done;
      });
    },
    completed: function() {
      return this.newList.filter(function(item) {
        return item.done;
      });
    },
    completedPercentage: function() {
      if (this.newList.length == 0) {
        return 0;
      }
      return Math.floor((this.completed.length / this.newList.length) * 100);
    },
    today: function() {
      var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
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
  mounted() {
    // let test = JSON.parse(window.localStorage.getItem(this.username))["Modules"];
    // console.log(test)
    this.getNew();

    $("#username").css("textTransform", "capitalize");

    $(".add-card").click(function() {
      var textarea = $(this).prev();
      var column = $(this)
        .closest(".column")
        .find(".cards");

      column.append("<div class='card'><p>" + textarea.val() + "</p></div>");

      textarea.val("");
    });

    function initparticles() {
      bubbles();
      hearts();
      confetti();
    }

    function bubbles() {
      $.each($(".particletext.bubbles"), function() {
        var bubblecount = ($(this).width() / 50) * 10;
        for (var i = 0; i <= bubblecount; i++) {
          var size = $.rnd(40, 80) / 10;
          $(this).append(
            '<span class="particle" style="top:' +
              $.rnd(20, 80) +
              "%; left:" +
              $.rnd(0, 95) +
              "%;width:" +
              size +
              "px; height:" +
              size +
              "px;animation-delay: " +
              $.rnd(0, 30) / 10 +
              's;"></span>'
          );
        }
      });
    }

    function hearts() {
      $.each($(".particletext.hearts"), function() {
        var heartcount = ($(this).width() / 400) * 5;
        for (var i = 0; i <= heartcount; i++) {
          var size = $.rnd(60, 120) / 10;
          $(this).append(
            '<span class="particle" style="top:' +
              $.rnd(20, 80) +
              "%; left:" +
              $.rnd(0, 95) +
              "%;width:" +
              size +
              "px; height:" +
              size +
              "px;animation-delay: " +
              $.rnd(0, 30) / 10 +
              's;"></span>'
          );
        }
      });
    }

    function confetti() {
      $.each($(".particletext.confetti"), function() {
        var confetticount = ($(this).width() / 50) * 10;
        for (var i = 0; i <= confetticount; i++) {
          $(this).append(
            '<span class="particle c' +
              $.rnd(1, 2) +
              '" style="top:' +
              $.rnd(10, 50) +
              "%; left:" +
              $.rnd(0, 100) +
              "%;width:" +
              $.rnd(6, 8) +
              "px; height:" +
              $.rnd(3, 4) +
              "px;animation-delay: " +
              $.rnd(0, 30) / 10 +
              's;"></span>'
          );
        }
      });
    }

    $.rnd = function(m, n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    };

    initparticles();
  },
  created() {
    // display name on dashboard
    this.username = window.localStorage.getItem("username");
    let credentials = JSON.parse(window.localStorage.getItem(this.username));
    this.name = credentials["Name"];

    // get no. of mods
    // console.log(JSON.parse(window.localStorage.getItem(username)))
    this.modules = window.localStorage.getItem("modules");
    this.modules = this.modules.split(",");
    console.log(this.modules);

    if (window.localStorage) {
      if (!localStorage.getItem("firstReLoad")) {
        localStorage["firstReLoad"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("firstReLoad");
      }
    }
  },
  watch: {
    newList: {
      handler: function(updatedList) {
        localStorage.setItem("new_list", JSON.stringify(updatedList));
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  background-color: #f7fafc;
  overflow-y: auto;
  font-family: "Poppins", sans-serif;
}

#schedule {
  height: 87vh;
  overflow-y: auto;
  z-index: 999;
}

.height17 {
  height: 17vh;
}

.height45 {
  height: 60.5vh;
}

.height24 {
  height: 24vh;
}

.box {
  background-color: white;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
.cont {
  height: 95% !important;
}

.modCards {
  overflow-y: auto;
  height: 100%;
}

.message {
  font-size: 2vw;
  text-align: left;
  background: transparent;
}

.add {
  background-color: #007bff;
  color: white;
  margin-top: 10px;
  width: 30%;
  font-size: 15px;
}

ul {
  margin-top: 10px;
  padding: 0px;
}

.glyphicon {
  margin-left: 10px;
}

.todo-item {
  margin-left: 10px;
  font-size: 18px;
}

.input-field {
  margin-left: 10px;
  margin-right: 10px;
}

.container {
  padding: 1%;
}

p {
  padding-left: 10px;
  padding-top: 10px;
}

.column {
  background: #f5f5f5;
  margin-right: 2%;
  padding: 1%;
  border-radius: 3px;
  width: 32%;
  float: left;
  height: auto;
  border-radius: 10px;
}
.column:last-of-type {
  margin-right: 0;
}
.column .column-title {
  font-weight: bold;
  margin: 5px 0 20px;
}
.column .card {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  -webkit-transition: -webkit-transform 250ms;
  transition: -webkit-transform 250ms;
  transition: transform 250ms;
  transition: transform 250ms, -webkit-transform 250ms;
}
.column .card.selected {
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
  z-index: 1;
}
.column textarea {
  border: none;
  resize: vertical;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 20px;
}
.column textarea:focus {
  outline: none;
}

/*.scroll {
  overflow: auto;
  height: 18vh;
}*/

.trans {
  background: transparent;
}

.vdr {
  border: none !important;
  position: none !important;
}

.whiteboard {
  background: white;
  min-width: 1200px;
  max-width: 1700px;
  min-height: 900px;
  border-radius: 10px;
  padding: 5px;

  position: relative !important;
  .first {
    top: 400px;
    left: 0px;
  }
  .second {
    top: 0;
    left: 400px;
  }

  .third {
    top: 0;
  }
}
</style>
