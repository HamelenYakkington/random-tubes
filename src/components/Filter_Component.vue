<template>
  <div :class="['div_filter', filterActive ? 'div_filter_active' : '']">
    <div class="search_gest">
      <button
        class="button_gest button_filter a_button_secondary"
        @click="toggleFilterDiv"
      >
        <span class="material-symbols-outlined">filter_alt</span>
      </button>
    </div>
    <div class="filters_param">
      <form>
        <div class="row mb-3">
          <div class="col">
            <label for="keyword" class="form-label">Keyword</label>
            <input
              type="text"
              id="keyword"
              class="form-control"
              v-model="temp_keyword"
              @input="temp_keyword = $event.target.value.replace(/\s+/g, '-')"
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="durationInput" class="form-label">Duration</label>
            <select
              id="durationInput"
              class="form-select"
              v-model="temp_duration"
            >
              <option value="any">Any</option>
              <option value="long">Long</option>
              <option value="medium">Medium</option>
              <option value="short">Short</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="categoryId" class="form-label">Category</label>
            <select id="categoryId" class="form-select" v-model="temp_category">
              <option value="">Aucune catégorie</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.snippet.title }}
              </option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="langageId" class="form-label">Language</label>
            <select id="langageId" class="form-select" v-model="temp_language">
              <option value="">Aucun langage</option>
              <option
                v-for="language in languages"
                :key="language.id"
                :value="language.id"
              >
                {{ language.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="safeInput" class="form-label">Safe</label>
            <select id="safeInput" class="form-select" v-model="temp_safe">
              <option value="moderate">Moderate</option>
              <option value="strict">Strict</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="publishAfter" class="form-label">Publish After</label>
            <input
              type="date"
              id="publishAfter"
              class="form-control"
              v-model="temp_publishedAfter"
            />
          </div>
          <div class="col-md-6">
            <label for="publishBefore" class="form-label">Publish Before</label>
            <input
              type="date"
              id="publishBefore"
              class="form-control"
              v-model="temp_publishedBefore"
            />
          </div>
        </div>
      </form>
      <div class="row mb-3 div_gest_filter">
        <button class="col-6 a_button button_reset" @click="resetFilter">
          Reset
        </button>
        <button class="col-6 a_button button_cancel" @click="cancelFilter">
          Cancel
        </button>
        <button class="col-12 a_button button_submit" @click="submitFilter">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterConponent",
  data() {
    return {
      filterActive: false,
      keyword: "",
      duration: "any",
      category: "",
      language: "",
      safe: "strict",
      publishedBefore: "",
      publishedAfter: "",

      temp_keyword: "",
      temp_duration: "any",
      temp_category: "",
      temp_language: "",
      temp_safe: "strict",
      temp_publishedBefore: "",
      temp_publishedAfter: "",

      languages: [],
      categories: [],
    };
  },
  mounted() {
    this.loadCategories();
    this.loadLanguages();
  },
  methods: {
    toggleFilterDiv() {
      this.filterActive = !this.filterActive;
    },
    closeFilter() {
      this.filterActive = false;
    },
    resetFilter() {
      this.temp_keyword = this.keyword;
      this.temp_duration = this.duration;
      this.temp_category = this.category;
      this.temp_language = this.language;
      this.temp_safe = this.safe;
      this.temp_publishedBefore = this.publishedBefore;
      this.temp_publishedAfter = this.publishedAfter;
    },
    cancelFilter() {
      this.closeFilter();
    },
    submitFilter() {
      this.keyword = this.temp_keyword;
      this.duration = this.temp_duration;
      this.category = this.temp_category;
      this.language = this.temp_language;
      this.safe = this.temp_safe;
      this.publishedBefore = this.temp_publishedBefore;
      this.publishedAfter = this.temp_publishedAfter;

      this.$emit("apply-filters", {
        keyword: this.temp_keyword,
        duration: this.temp_duration,
        category: this.temp_category,
        language: this.temp_language,
        safe: this.temp_safe,
        publishedBefore: this.temp_publishedBefore,
        publishedAfter: this.temp_publishedAfter,
      });

      this.closeFilter();
    },
    loadCategories() {
      const apiKey = process.env.VUE_APP_TOKEN_API;
      if (!apiKey) {
        const message_error = "Error : API key missing";
        this.$emit("message", {
          newMessage: message_error,
          newTypeMessage: "error",
        });
        return;
      }

      let youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US`;
      youtubeApiUrl += `&key=${apiKey}`;

      fetch(youtubeApiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.categories = data.items;
        })
        .catch((error) => {
          const message_error = "An error occured :  " + error;
          this.$emit("message", {
            newMessage: message_error,
            newTypeMessage: "error",
          });
        });
    },
    loadLanguages() {
      const apiKey = process.env.VUE_APP_TOKEN_API;
      if (!apiKey) {
        const message_error = "Error : API key missing";
        this.$emit("message", {
          newMessage: message_error,
          newTypeMessage: "error",
        });
        return;
      }

      const languagesApiUrl = `https://www.googleapis.com/youtube/v3/i18nLanguages?part=snippet&key=${apiKey}`;

      fetch(languagesApiUrl)
        .then((response) => response.json())
        .then((data) => {
          this.languages = data.items.map((item) => ({
            id: item.id,
            name: item.snippet.name,
          }));
        })
        .catch((error) => {
          const message_error = "An error occurred: " + error;
          this.$emit("message", {
            newMessage: message_error,
            newTypeMessage: "error",
          });
        });
    },
  },
};
</script>

<style>
/* ---------------------------------------------------------------------------------- */
/*                              -- Style div_filter --                                */
/* ---------------------------------------------------------------------------------- */
.div_filter {
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 800px;
  right: 0px;
  margin-top: auto;
  margin-bottom: 50px;
  transition: transform 0.5s ease-out;
  transform: translateY(calc(100%));
  z-index: 150;
}

.div_filter_active {
  transform: translateY(calc(100% - 60vh));
}

.filters_param {
  padding: 10px;
  color: var(--primary);
  margin-top: 50px;
  border: 2px solid var(--secondary);
  border-radius: 15px 15px 0 0;
  height: 100vh;
  background-color: var(--third);
  transition: transform 0.5s ease-out, opacity 0.3s ease-out;
  opacity: 0;
}

.div_filter_active .filters_param {
  margin-top: 50px;
  opacity: 1;
}

.div_gest_filter button {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 5px;
  border-radius: 5px;
}

.button_submit {
  color: black;
  background-color: #f5b800;
}

.button_cancel {
  color: white;
  background-color: rgb(82, 82, 82);
}

.button_reset {
  color: white;
  background-color: rgb(116, 114, 114);
}

@media (max-width: 768px) {
  .div_filter_active {
    transform: translateY(calc(100% - 100vh + 100px));
  }
}
</style>
