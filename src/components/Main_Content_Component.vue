<template>
  <div class="div_background">
    <img
      src="../assets/images/background.webp"
      alt="fond_background"
      class="fond_background"
    />
  </div>
  <div class="main_content">
    <div class="tube_reader">
      <div v-if="isLoading" class="iframe_loader">
        <div class="spin_window">
          <div class="spinner"></div>
        </div>
      </div>
      <iframe
        :src="current_url"
        @load="onIframeLoad"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div class="gest_reader">
        <button
          @click="clickPrecButton"
          :class="[
            'prev_button',
            prec_url.length > 0 ? 'a_button_secondary' : 'a_button_disabled',
          ]"
        >
          Prev
        </button>
        <button @click="clickNextButton" class="next_button a_button_primary">
          Next
        </button>
      </div>
    </div>
    <Filter_Component
      @apply-filters="handleUpdateParameterFilter"
      @message="handleMessageUpdate"
    />

    <FashMessageComponent
      :message="message"
      :typeMessage="typeMessage"
      @update:message="updateMessage"
      @update:typeMessage="updateTypeMessage"
    />
  </div>
</template>

<script>
import FashMessageComponent from "./Flash_Message_Component.vue";
import Filter_Component from "./Filter_Component.vue";

export default {
  name: "MainContentVue",
  components: { FashMessageComponent, Filter_Component },
  data() {
    return {
      isLoading: false,
      prec_url: [],
      next_url: [],
      current_url:
        "https://www.youtube.com/embed/jNQXAC9IVRw?si=TOifG8yNjoy6pwNY",
      nexPageToken: "",
      message: "",
      typeMessage: "",

      keyword: "",
      duration: "",
      category: "",
      language: "",
      safe: "",
      publishedBefore: "",
      publishedAfter: "",
    };
  },
  methods: {
    clickNextButton() {
      this.isLoading = true;

      if (this.next_url.length) {
        this.prec_url.push(this.current_url);
        this.current_url = this.next_url.pop();
      } else {
        const apiKey = process.env.VUE_APP_TOKEN_API;
        const maxResult = 3;

        if (!apiKey) {
          console.error("Error : API key missing");
          return;
        }

        let youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
        youtubeApiUrl += `&videoEmbeddable=true`;
        youtubeApiUrl += `&maxResults=${maxResult}`;
        youtubeApiUrl += `&type=video`;

        if (this.keyword != "") {
          youtubeApiUrl += `&q=${this.keyword}`;
        }

        if (this.duration != "") {
          youtubeApiUrl += `&videoDuration=${this.duration}`;
        }

        if (this.category != "") {
          youtubeApiUrl += `&videoCategoryId=${this.category}`;
        }

        if (this.language) {
          youtubeApiUrl += `&relevanceLanguage=${this.language}`;
        }

        if (this.safe) {
          youtubeApiUrl += `&safeSearch=${this.safe}`;
        }

        if (this.publishedBefore) {
          youtubeApiUrl += `&publishedBefore=${this.publishedBefore}`;
        }

        if (this.publishedAfter) {
          youtubeApiUrl += `&publishedAfter=${this.publishedAfter}`;
        }

        if (this.nexPageToken != "") {
          youtubeApiUrl += `&pageToken=${this.nexPageToken}`;
        }
        youtubeApiUrl += `&key=${apiKey}`;

        fetch(youtubeApiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.items && data.items.length > 0) {
              this.prec_url.push(this.current_url);
              const randomVideoItemsId = Math.floor(
                Math.random() * data.items.length
              );
              const videoId = data.items[randomVideoItemsId].id.videoId;
              this.nexPageToken = data.nextPageToken;
              this.current_url = `https://www.youtube.com/embed/${videoId}`;
            } else {
              this.updateMessage(
                "An error occured :  No video have been found.",
                "error"
              );
            }
          })
          .catch((error) => {
            this.updateMessage("An error occured :  " + error, "error");
          });
        this.isLoading = false;
      }
    },
    clickPrecButton() {
      if (this.prec_url.length) {
        this.isLoading = true;
        this.next_url.push(this.current_url);
        this.current_url = this.prec_url.pop();
      }
    },
    updateMessage(newMessage, newTypeMessage) {
      this.message = newMessage;
      this.typeMessage = newTypeMessage;
    },
    onIframeLoad() {
      this.isLoading = false;
    },
    updateParameterFilter(
      pKeyword,
      pDuration,
      pCategory,
      pLanguage,
      pSafe,
      pPublishedBefore,
      pPublishedAfter
    ) {
      const durations = ["any", "long", "medium", "short"];
      const safeLevels = ["moderate", "strict", "none"];

      if (!durations.includes(this.pDuration)) {
        this.pDuration = "any";
      }

      if (!safeLevels.includes(this.pSafe)) {
        this.pSafe = "strict";
      }

      this.keyword = pKeyword;
      this.duration = pDuration;
      this.category = pCategory;
      this.language = pLanguage;
      this.safe = pSafe;
      this.publishedBefore = pPublishedBefore;
      this.publishedAfter = pPublishedAfter;
    },
    handleUpdateParameterFilter(payload) {
      this.updateParameterFilter(
        payload.keyword,
        payload.duration,
        payload.category,
        payload.language,
        payload.safe,
        payload.publishedBefore,
        payload.publishedAfter
      );
    },
    handleMessageUpdate(payload) {
      this.updateMessage(payload.newMessage, payload.newTypeMessage);
    },
  },
};
</script>

<style>
/* ---------------------------------------------------------------------------------- */
/*                             -- Style Background --                                 */
/* ---------------------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------------------- */
/*                               -- Style Content --                                  */
/* ---------------------------------------------------------------------------------- */
.main_content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(57, 56, 56, 0.6);
  width: 100%;
  height: 100%;
  z-index: 900;
}

/* ---------------------------------------------------------------------------------- */
/*                             -- Style Tube Reader --                                */
/* ---------------------------------------------------------------------------------- */
.tube_reader {
  padding-top: 2vh;
  position: relative;
  height: 100%;
  max-height: 60vh;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
  flex: 1;
  display: flex;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100vw;
}

.tube_reader iframe {
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  min-height: 315px;
  border: none;
}

.tube_reader button {
  font-size: 16px;
  font-weight: bold;
  width: 75px;
  height: 35px;
  border-radius: 20px;
}

.gest_reader {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: end;
  padding-top: 5px;
  text-align: end;
  width: 100%;
  max-width: 800px;
}

/* ---------------------------------------------------------------------------------- */
/*                                -- Style Loader --                                  */
/* ---------------------------------------------------------------------------------- */

.iframe_loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  aspect-ratio: 16 / 9;
  background-color: rgba(0, 0, 0, 0.503);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 910;
  pointer-events: none;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--primary);
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spin_window {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);
  margin-bottom: 300px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---------------------------------------------------------------------------------- */
/*                             -- Style Search Gest --                                */
/* ---------------------------------------------------------------------------------- */
.search_gest {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
}

.button_gest {
  width: 44px;
  height: 44px;
  border-radius: 10px;
}

.button_gest span {
  font-size: 32px;
  font-weight: bold;
}

.button_gest img {
  width: 30px;
  height: 30px;
}
</style>
