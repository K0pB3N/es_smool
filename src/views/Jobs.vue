<template>
  <div id="jobs">
    <Navbar />

    <!-- searchbar -->
    <div class="container-fluid" id="searchBar">
      <div class="d-flex justify-content-center row">
        <div id="keyword">
          <input
            type="text"
            id="q"
            class="form-control"
            placeholder="Работа, Компании..."
            aria-label="keyword"
            aria-describedby="basic-addon1"
          />
        </div>

        <div>
          <b-dropdown
            variant="outline-dark"
            id="jobType"
            :text="placeholder"
            class="ml-3"
          >
            <b-dropdown-item
              @click="
                searchTerm = 'полная занятость';
                placeholder = 'Полная занятость';
              "
              >Полный занятость</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                searchTerm = 'частичная занятость';
                placeholder = 'Частичная занятость';
              "
              >Частичная занятость</b-dropdown-item
            >
            <b-dropdown-item
              @click="
                searchTerm = 'стажировка';
                placeholder = 'Стажировка';
              "
              >Стажировка</b-dropdown-item
            >
            <!-- <b-dropdown-item
              @click="
                searchTerm = 'fl';
                placeholder = 'Freelance';
              "
              >Freelance</b-dropdown-item
            > -->
          </b-dropdown>
        </div>
        <div id="searchJob">
          <b-button type="is-info is-light" @click="search()">Поиск</b-button>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="cardWrap">
        <div class="card box" :key="result.title" v-for="result in results">
          <div class="ml-4">
            <div class="card-title">{{ result.title }}</div>
            <div class="card-body">{{ result.snippet }}</div>
            <button :href="result.formattedUrl" variant="outline-dark">
              Apply now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Jobs",
  components: {
    Navbar
  },
  mounted() {},
  created() {
    if (window.localStorage) {
      if (!localStorage.getItem("firstReLoad")) {
        localStorage["firstReLoad"] = true;
        window.location.reload();
      } else {
        localStorage.removeItem("firstReLoad");
      }
    }
  },
  data() {
    return {
      searchTerm: "Стажировка",
      results: [],
      placeholder: "Тип занятости"
    };
  },
  methods: {
    search() {
      var q = document.getElementById("q").value.replace(/\s+/g, "+");
      q += "+" + this.searchTerm + "+" + "Russia";
      console.log(q);
      // let key = "AIzaSyBOgzNtXX2fAoV5euB-4urR_L2pJTPan7o";
      // let cx = "f5cccf8e1ce3fceca";
      let url =
        "https://api.hh.ru/widgets/vacancies/search?count=3&locale=RU&links_color=1560b2&border_color=1560b2&employment=full&employment=part&employment=volunteer&employment=probation&professional_role=10&professional_role=121&professional_role=104&professional_role=107&professional_role=112&professional_role=113&professional_role=114&professional_role=116&professional_role=12&professional_role=124&professional_role=125&professional_role=126&professional_role=148&professional_role=150&professional_role=155&professional_role=156&professional_role=157&professional_role=160&professional_role=164&professional_role=165&professional_role=25&professional_role=34&professional_role=36&professional_role=73&professional_role=96" +
        // key +
        // "&cx=" +
        // cx +
        // "&q=" +
        q;
      // console.log(url);
      var cardWrap = document.getElementById("cardWrap");
      cardWrap.innerHTML = "";
      Vue.axios.get(url).then(resp => {
        this.result = resp.data.items;
        for (var result of resp.data.items) {
          console.log(result);
          //b-card-title
          var titleNode = document.createElement("h5");
          titleNode.appendChild(document.createTextNode(result.title));
          //b-card-text
          var textNode = document.createElement("h6");
          textNode.appendChild(document.createTextNode(result.snippet));
          //apply now
          var buttonNode = document.createElement("button");
          buttonNode.className = "button button2";
          buttonNode.setAttribute(
            "onclick",
            "javascript:window.open('" + result.formattedUrl + "', '_blank');"
          );
          buttonNode.setAttribute("target", "_blank");
          buttonNode.setAttribute(
            "style",
            "background-color: transparent; margin-top: 5px; border: 1px black solid"
          );
          buttonNode.appendChild(document.createTextNode("Apply here"));
          // container wrap
          var wrapper = document.createElement("div");
          wrapper.className = "container";
          wrapper.appendChild(titleNode);
          wrapper.appendChild(textNode);
          wrapper.appendChild(buttonNode);
          // card wrap
          var bCard = document.createElement("div");
          bCard.className = "card";
          bCard.appendChild(wrapper);
          bCard.setAttribute(
            "style",
            "margin-bottom: 20px; padding: 20px; background-color: #c5e4ee; box-shadow: 0 0 1px rgba(255, 186, 186, 0.2), 0 2px 4px rgba(255, 186, 186, 0.2); border-radius: 5px;"
          );
          cardWrap.appendChild(bCard);
        }
        // console.log(cardWrap)
      });
    }
  }
};
</script>

<style scoped>
#jobs {
  font-family: Poppins;
}
body {
  background: white;
  text-align: center;
}
#searchBar {
  background-color: #b0d7e4;
  padding: 1%;
}
#keyword,
#category {
  width: 500px;
  margin-left: 1%;
}
#searchJob {
  margin-left: 1%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  margin-bottom: 20px !important;
  margin-top: 20px !important;
  padding: 20px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.container {
  padding: 30px;
  margin-bottom: 10px !important;
  margin-top: 10px !important;
}
.button {
  background-color: #42b489; 
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
} 
.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}
.button2:hover {
  background-color: #008cba;
  color: white;
}
.box {
  background: #f9f9f9;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
