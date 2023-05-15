<template>
  <div
    class="scroll d-flex flex-column justify-content-between align-items-center"
  >
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
                        <span style="font-size: 1.5rem;">Ещё чуть-чуть! 🌟</span>
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
                        /><span style="font-size: 1.5rem;"
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
</template>

<script>
export default {
  name: "Progress",
  data: () => ({
    tasksDone: 10
  }),
  computed: {
    tasksDonePercent() {
      return (this.tasksDone * 100) / 10;
    },
    component() {
      return "vue-ellipse-progress";
    }
  }
};
</script>

<style scoped>
.message {
  font-size: 2vw;
  text-align: left;
  background: transparent;
}

/*.scroll {
  height: 15vh;
  overflow-y: auto;
}*/
</style>
