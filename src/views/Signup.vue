<template>
  <div
    id="signup"
    style=" height: 100%; overflow-y: scroll; overflow-x: hidden; width: 100%;"
  >
    <!-- header -->
    <div class="area" style="height:100%; width: 100%;overflow: visible">
      <ul class="circles" style="height:100%; width: 100%; overflow: visible">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div class="d-flex justify-content-between">
      <img
        src="../assets/images/smoolife.png"
        id="logo"
        style="margin-bottom: 0px; width: 10rem"
      />
      <div id="sign-in">
        <button
          type="button"
          class="btn btn-primary"
          @click="$router.push('/login')"
        >
          Войти
        </button>
      </div>
    </div>

    <!-- <div class="row" id="header">
      <div class="col ">
        <img
          src="../assets/images/smoolife.png"
          id="logo"
          style="margin-bottom: 0px;"
        />
      </div>

      <div class="col" id="sign-in">
        <button
          type="button"
          class="btn btn-primary"
          @click="$router.push('/login')"
        >
          Sign in
        </button>
      </div>
    </div> -->

    <div class="row d-flex justify-content-center">
      <img
        src="../assets/images/corgi_study.gif"
        style="width: 10%; height: 10%;"
      />
    </div>

    <div class="row">
      <div class="col">
        <!-- registration details -->
        <div class="row">
          <div class="container" id="registration">
            <div class="row  d-flex justify-content-center">
              <h1>Создать аккаунт</h1>
            </div>

            <div class="row  d-flex justify-content-center">
              <input
                type="text"
                class="form-control reg-form"
                placeholder="Имя пользователя"
                aria-label="Username"
                v-model="username"
                style="width: 56vw"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div class="row  d-flex justify-content-center">
              <input
                type="text"
                class="form-control reg-form"
                placeholder="Ф.И.О."
                aria-label="Name"
                v-model="name"
                style="width: 56vw"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div class="row  d-flex justify-content-center">
              <input
                type="password"
                class="form-control reg-form"
                placeholder="Пароль"
                aria-label="Password"
                v-model="password"
                style="width: 56vw"
                aria-describedby="addon-wrapping"
              />
            </div>

            <div
              class="row d-flex justify-content-md-left justify-content-center"
              id="selectModHeader">
              <h4>Выберите Ваши курсы:</h4>
            </div>

            <!-- add modules -->
            <div id="vueMagic">
              <div class="row d-flex justify-content-center">
                <section>
                  <b-field>
                    <b-autocomplete
                      rounded
                      v-model="newItem"
                      :data="filteredDataArray"
                      placeholder="к примеру: 09.03.04 Программная инженерия"
                      icon="magnify"
                      clearable
                      @select="option => (selected = option)"
                    >
                      <template slot="empty">Результаты не найдены</template>
                    </b-autocomplete>
                  </b-field>
                </section>

                <button
                  type="button"
                  class="btn btn-outline-primary btn-circle btn-sm text-center"
                  v-on:click="addNewItem"
                >
                  +
                </button>
              </div>

              <!-- need to fix width of the area of the list -->
              <div class="row" style="width: 100%; margin-left: 10em">
                <ul
                  style="list-style-type: none; white-space: nowrap; max-width:auto;"
                >
                  <li v-for="(item, index) in items" :key="index" id="modStyle">
                    {{ item }}
                    <button
                      type="button"
                      class="btn btn-outline-dark  btn-circle btn-sm"
                      @click="deleteFromList(index)"
                      style="display: inline-block;"
                    >
                      -
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <!-- register button -->
            <div class="row d-flex justify-content-center" id="reg-button">
              <button
                type="button"
                class="btn btn-outline-primary text-center"
                href="#"
                @click="submit()"
              >
                Зарегистрироватсья!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import("@/assets/styles/login.css");

export default {
  name: "Signup",
  data() {
    return {
      items: [],
      departments: [
        "01.03.02 Прикладная математика и информатика",
        "01.03.04 Прикладная математика",
        "01.03.05 Статистика",
        "02.03.02 Фундаментальная информатика и информационные технологии",
        "03.03.02 Физика",
        "05.03.03 Картография и геоинформатика",
        "09.03.01 Информатика и вычислительная техника",
        "09.03.02 Информационные системы и технологии",
        "09.03.03 Прикладная информатика",
        "09.03.04 Программная инженерия",
        "10.03.01 Информационная безопасность",
        "11.03.01 Радиотехника",
        "11.03.02 Инфокоммуникационные технологии и системы связи",
        "11.03.03 Конструирование и технология электронных средств",
        "11.03.04 Электроника и наноэлектроника",
        "12.03.01 Приборостроение",
        "12.03.02 Оптотехника",
        "12.03.04 Биотехнические системы и технологии",
        "12.03.05 Лазерная техника и лазерные технологии",
        "15.03.01 Машиностроение",
        "15.03.04 Автоматизация технологических процессов и производств",
        "15.03.06 Мехатроника и робототехника",
        "18.03.01 Химическая технология",
        "19.03.01 Биотехнология",
        "20.03.01 Техносферная безопасность",
        "22.03.01 Материаловедение и технологии материалов",
        "27.03.01 Стандартизация и метрология",
        "27.03.02 Управление качеством",
        "27.03.03 Системный анализ и управление",
        "27.03.04 Управление в технических системах",
        "27.03.05 Инноватика",
        "28.03.01 Нанотехнологии и микросистемная техника",
        "29.03.04 Технология художественной обработки материалов",
        "38.03.01 Экономика",
        "38.03.02 Менеджмент",
        "38.03.03 Управление персоналом",
        "38.03.04 Государственное и муниципальное управление",
        "38.03.05 Бизнес-информатика",
        "38.03.10 Жилищное хозяйство и коммунальная инфраструктура",
        "40.03.01 Юриспруденция",
        "46.03.02 Документоведение и архивоведение",
        "54.03.01 Дизайн"
      ],
      newItem: "",
      selected: null,
      details: [],
      username: "",
      name: "",
      password: "",
      modulesSelected: []
    };
  },
  methods: {
    deleteFromList(index) {
      this.items.splice(index, 1);
    },
    addNewItem() {
      if (this.newItem != "") {
        this.items.push(this.newItem);
        this.newItem = "";
      } else {
        alert("Пожалуйста, выберите направление обучения!");
      }
    },
    submit() {
      if (
        this.username.length > 0 &&
        this.password.length > 0 &&
        this.name.length > 0 &&
        this.items.length > 0
      ) {
        this.details = {
          Username: this.username,
          Name: this.name,
          Password: this.password,
          Modules: this.items
        };
        let data = JSON.stringify(this.details);
        window.localStorage.setItem(this.username, data);
        this.modulesSelected.push(this.items);
        window.localStorage.setItem("modules", this.modulesSelected);
        console.log(window.localStorage.getItem("modules"));
        window.location.href = "/#/login";
      } else {
        if (this.username.length <= 1) {
          alert("Пожалуйста, укажите имя пользователя верно!");
        }
        if (this.password.length <= 1) {
          alert("Пожалуйста, укажите пароль верно!");
        }
        if (this.name.length <= 1) {
          alert("Пожалуйста, укажите Ф.И.О. верно!");
        }
        if (this.items.length < 1) {
          alert("Пожалуйста, выберите направление обучения!");
        }
        // for (var i in this.items) {
        //   if (this.items[i] === "") {
        //     alert("Пожалуйста, выберите направление обучения!");
        //   }
        // }
      }
    }
  },
  computed: {
    filteredDataArray() {
      return this.departments.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.newItem.toLowerCase()) >= 0
        );
      });
    }
  }
};
// import("@/assets/styles/login.css");
require("@/assets/styles/login.css");
// @import "assets/styles/login.css"
</script>

<style>
#logo {
  max-width: 50%;
  max-height: 50%;
  margin-left: 20px;
  margin-top: 20px !important;
}

#sign-in {
  margin-top: 20px;
  margin-right: 20px;
  text-align: right;
  position: relative;
  z-index: 999;
}

#blank-space {
  height: 40px;
}

#dropdown {
  margin-top: 3%;
}
.reg-form {
  width: 75%;
  font-size: large;
  margin-top: 3%;
}

.dropdown-toggle {
  margin-top: 3%;
}

#dDSchool {
  margin-left: 1%;
}

#selectModHeader {
  margin-top: 3%;
}

.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  padding: 0px 0px;
  border-radius: 15px;
  font-size: large;
  text-align: center;
  margin-left: 1%;
  margin-top: 0.5%;
}

#addModule {
  margin-top: 3%;
}

.input-bar-item {
  display: table-cell;
}

#modAdd {
  width: 70%;
}

#courseText {
  width: 50%;
}
/* @keyframes bgcolor {
  0% {
    background: #ffdcce;
  }
  20% {
    background: #dcee9d;
  }
  60% {
    background: #ffe8ff;
  }
  80% {
    background: #cdcdf8;
  }
  100% {
    background: #dcf1c8;
  }
} */

.btn-primary,
.btn-secondary {
  background-color: #6987c9;
  border: #6987c9;
}

#registration {
  margin-bottom: 100px;
}

.autocomplete {
  width: 54vw;
  margin-bottom: 20px;
}

#modStyle {
  margin-left: auto;
  /* margin-right: auto; */
}
/* eslint-disable */
</style>
