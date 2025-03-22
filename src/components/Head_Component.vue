<template>
  <div
    class="div_head row d-flex justify-content-start align-items-center pl-2"
  >
    <div class="logo_div col-sm-2 col-12">
      <Logo_Component />
    </div>

    <div class="title_head col-sm-2 col-12">
      <span>RandomTubes</span>
    </div>
  </div>
</template>

<script>
import Logo_Component from "./Logo_Component.vue";

export default {
  name: "HeadComponent",
  components: {
    Logo_Component,
  },
};
</script>

<style>
.div_head {
  background-color: black;
  min-height: 120px;
  text-align: center;
}

.title_head span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 40;
  font-size: 40px;
  color: #f5b800;
  text-align: center;
}

.logo_div {
  height: 100px;
}
</style>
