<template>
  <div class="div_background">
    <img
      src="../assets/background.webp"
      alt="fond_background"
      class="fond_background"
    />
  </div>
  <div class="main_content">
    <div class="tube_reader">
      <iframe
        src="https://www.youtube.com/embed/Ey3zl07kf5M?si=A-nqUDoTLSdyaWCF"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div class="gest_reader">
        <button class="prev_button">Prev</button>
        <button class="next_button">Next</button>
      </div>
    </div>
    <div class="search_gest"></div>
    <div class="filters_param"></div>
  </div>
</template>

<script>
export default {
  name: "MainContentVue",
};
</script>

<style>
.div_background {
  position: absolute;
  width: auto;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 100;
}

.fond_background {
  width: 100%;
}

.main_content {
  position: relative;
  background-color: rgba(57, 56, 56, 0.6);
  width: 100%;
  height: 100%;
  z-index: 900;
  padding-top: 2vh;
}

.tube_reader {
  position: relative;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
}

.tube_reader iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.tube_reader button {
  font-size: 16px;
  font-weight: bold;
  width: 75px;
  height: 35px;
  border-radius: 20px;
  text-align: center;
  border: 0px;
  transition: translate 0.3s;
}

.tube_reader button:hover {
  translate: -2px -2px;
}

.prev_button {
  background-color: black;
  color: #f5b800;
}

.prev_button:hover {
  box-shadow: 5px 5px 5px #f5b800;
}

.next_button {
  margin-left: 7px;
  background-color: #f5b800;
  color: black;
}

.next_button:hover {
  box-shadow: 5px 5px 5px black;
}

.gest_reader {
  padding-top: 5px;
  text-align: end;
}
</style>
