<template>
  <nav
    :class="{
      'navbar-bottom': position === 'bottom',
      'navbar-left': position === 'left'
    }"
    class="navbar navbar-expand-lg navbar-light bg-light"
  >
    <a class="navbar-brand" href="#">
      <img
        src="@/assets/images/smoolife.png"
        alt="SMOOLIFE"
        style="width: 7em"
      />
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto mt-2">
        <li class="nav-item">
          <span class="nav-link"><b-link :to="'Home'">Главная</b-link></span>
        </li>
        <li class="nav-item">
          <span class="nav-link"><b-link :to="'Jobs'">Работа</b-link></span>
        </li>
        <li class="nav-item">
          <span class="nav-link"
            ><b-link :to="'ModulePlanner'">Планировщик дисциплин</b-link></span
          >
        </li>
      </ul>
      <div>
        <div class="widget mt-2">
          Последнее событие: {{ pending2[pending2.length - 1].title }}
        </div>
      </div>
      <div class="navbar-nav justify-content-end mt-2">
        <select
          name=""
          id=""
          v-model="position"
          v-on:change="changeStyle($event.target.value)"
        >
          <option value="top">Вверх</option>
          <option value="bottom">Низ</option>
          <option value="left" @click="changeStyle">Слева</option>
        </select>
        <button type="button" class="btn btn-light ml-2">
          <b-link :to="'Settings'">Настройки</b-link>
        </button>
        <button type="button" class="btn btn-light ml-2">
          <b-link :to="'Login'">Выход</b-link>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      position: "top",
      meetList: [],
      object: {
        name: "Alex",
        surname: "Sizov",
        age: 26
      }
    };
  },

  mounted() {
    this.getMeet();
  },
  props: {
    meeting: {
      type: String
    }
  },
  watch: {
    localStorage: {
      handler: function() {
        this.meetList = localStorage.meet_list;
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
    actual: localStorage.meet_list
  },
  methods: {
    getMeet() {
      if (localStorage.getItem("meet_list")) {
        this.meetList = JSON.parse(localStorage.getItem("meet_list"));
      }
    },
    changeStyle(position) {
      if (position === "top") {
        this.$parent.$refs.content.style.margin = "10px";
        this.$parent.$refs.content.style.padding = "5px";
      } else if (position === "bottom") {
        this.$parent.$refs.content.style.margin = "0 0 150px 0";
        this.$parent.$refs.content.style.padding = "10px";
      } else if (position === "left") {
        this.$parent.$refs.content.style.margin = "0 0 0 0";
        this.$parent.$refs.content.style.padding = "0 0 0 190px";
      }
    }
  }
};
</script>

<style lang="scss">
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  margin-bottom: 0px;
  display: block;
}

.navbar-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.widget {
  margin-right: 50px;
}

.navbar-left {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  height: 100%;
  width: 160px;
  .navbar-collapse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .navbar-nav {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
