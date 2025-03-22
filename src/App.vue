<template>
  <div v-if="start" class="container_randomTube">
    <HeadComponent />
    <div class="content content_randomTube">
      <MainContentComponent />
    </div>
    <FooterComponent />
  </div>
  <div v-else class="container_start">
    <div class="content content_start">
      <h1>RandomTubes</h1>
      <div class="logo_start">
        <LogoComponent />
      </div>
      <div class="description_start">
        <u><strong>Random Tubes</strong></u
        >, a web app enabling you to pick random media from YouTube, use search
        filters to refine your selection, and view statistics.
      </div>
      <button @click="setStartTrue">Start</button>
      <div class="footer_start">{{ copyrightText }}</div>
    </div>
  </div>
</template>

<script>
import HeadComponent from "./components/Head_Component.vue";
import LogoComponent from "./components/Logo_Component.vue";
import FooterComponent from "./components/Footer_Component.vue";
import MainContentComponent from "./components/Main_Content_Component.vue";

export default {
  name: "App",
  components: {
    HeadComponent,
    FooterComponent,
    LogoComponent,
    MainContentComponent,
  },
  data() {
    var copyrightText_var = `© ${new Date().getFullYear()} Steven Lefebvre tous droits réservés`;
    var start_var = false;
    if (this.$cookies.get("start")) {
      start_var = true;
    }
    return {
      start: start_var,
      copyrightText: copyrightText_var,
    };
  },
  methods: {
    setStartTrue() {
      this.start = true;
      this.$cookies.set("start", true, "7d");
    },
  },
};
</script>

<style>
/* ---------------------------------------------------------------------------------- */
/*                           -- Style application --                                  */
/* ---------------------------------------------------------------------------------- */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.content {
  position: relative;
  flex-direction: column;
  flex: 1;
}

/* ---------------------------------------------------------------------------------- */
/*                     -- Style Start of the application --                           */
/* ---------------------------------------------------------------------------------- */
.content_start {
  height: 100vh;
  color: #f5b800;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 20px;
  padding-top: 10vh;
  padding-left: 30px;
  padding-right: 30px;
  background-color: rgb(12, 12, 12);
}

.logo_start {
  width: 30vh;
  height: 30vh;
}

.content_start h1 {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 56;
  font-size: 10vw;
  text-align: center;
  padding-bottom: 20px;
}

.description_start {
  font-weight: 24;
  font-size: 3vh;
  max-width: 850px;
  text-align: center;
}

.content_start button {
  background-color: transparent;
  color: #f5b800;
  border: solid 5px #f5b800;
  border-radius: 20px;
  max-width: 256px;
  min-width: 65px;
  width: 10vw;
  max-height: 100px;
  min-height: 25px;
  height: 4vw;
  margin-top: 10px;
  font-size: clamp(0.6rem, 1.5vw, 1.2rem);
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.content_start button:hover {
  color: black;
  border-color: black;
  background-color: #f5b800;
}

.footer_start {
  font-family: "Montserrat";
  margin-top: auto;
  text-align: right;
  color: #f5b800a5;
  font-weight: 56;
  font-size: 16px;
  width: 100%;
}
/* ---------------------------------------------------------------------------------- */
/*                        -- Style application started  --                            */
/* ---------------------------------------------------------------------------------- */
.container_randomTube {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
