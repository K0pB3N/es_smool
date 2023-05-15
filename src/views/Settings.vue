<template>
  <div id="settings" class="text-center">
    <Navbar />
    <h1 class="text-center title">Измените Ваше направление</h1>
    <div class="container">
      <section v-for="n in modules.length" :value="n" :key="n">
        <b-field :key="n">
          <b-autocomplete
            v-model="modules[n - 1]"
            :key="n"
            rounded
            :data="filteredDataArray"
            icon="magnify"
            clearable
            :value="modules[n - 1]"
            ref="input"
            @select="option => (selected = option)"
          >
            <template slot="empty">Результаты не найдены</template>
          </b-autocomplete>
        </b-field>
      </section>

      <section v-for="x in addNewCount" :value="x" :key="x">
        <b-field :key="x">
          <b-autocomplete
            v-model="modules[x + modules.length]"
            :key="x"
            rounded
            :data="filteredDataArray"
            icon="magnify"
            clearable
            :value="modules[x + modules.length]"
            ref="input"
            @select="option => (selected = option)"
          >
            <template slot="empty">Результаты не найдены</template>
          </b-autocomplete>
        </b-field>
      </section>
    </div>
    <b-button class="button" variant="success" @click="confirm()"
      >Подтвердить</b-button
    >
    <div id="success" v-show="clicked">Сохранение прошло успешно!</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar";

export default {
  name: "Settings",
  components: {
    Navbar
  },
  data() {
    return {
      username: "",
      modules: [],
      newItem: "",
      form: {},
      clicked: false,
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
      ]
    };
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
    },
    addNewCount() {
      return Array.from(
        { length: 1 - this.modules.length },
        (_, i) => i + this.modules.length + 1
      );
    }
  },
  created() {
    this.username = window.localStorage.getItem("username");
    this.modules = window.localStorage.getItem("modules");
    this.modules = this.modules.split(",");

    if (window.localStorage) {
      if (!localStorage.getItem("firstReLoad")) {
        localStorage["firstReLoad"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("firstReLoad");
      }
    }
  },
  methods: {
    confirm() {
      this.modules = this.modules.filter(function(el) {
        return el != "";
      });
      console.log(this.modules);
      window.localStorage.setItem("modules", this.modules);
      this.clicked = true;
      // console.log(window.localStorage.getItem(this.username))
    }
  }
};
</script>

<style scoped>
#settings {
  font-family: Poppins;
}

.title {
  margin-top: 30px;
}

.button {
  display: inline-block;
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}
.button:hover {
  background-color: #008cba;
  color: white;
}

.autocomplete {
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-bottom: 20px;
}

#success {
  color: green;
  margin-top: 30px;
  font-size: 30px;
}
</style>
