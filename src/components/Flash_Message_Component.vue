<template>
  <div
    :class="[
      'flash_message',
      classMessage,
      message === '' ? 'flash_message_disabled' : '',
    ]"
  >
    {{ message }}
    <button class="close_message_button">
      <span class="material-symbols-outlined" @click="closeMessage">
        close
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  props: {
    message: String,
    typeMessage: String,
  },
  data() {
    return { classMessage: "" };
  },
  methods: {
    closeMessage() {
      this.$emit("update:message", "");
      this.$emit("update:typeMessage", "");
    },

    handleMessageChange() {
      switch (this.typeMessage) {
        case "info":
          this.classMessage = "flash_message_info";
          break;
        case "error":
          this.classMessage = "flash_message_error";
          break;
        default:
          this.classMessage = "flash_message_disabled";
          break;
      }
      setTimeout(() => {
        this.closeMessage();
      }, 3000);
    },
  },
  watch: {
    typeMessage() {
      this.handleMessageChange();
    },
  },
};
</script>

<style>
/* ---------------------------------------------------------------------------------- */
/*                            -- Style FlashMessage --                                */
/* ---------------------------------------------------------------------------------- */
.flash_message {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  width: auto;
  height: 50px;
  border: 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 30px;
  text-align: center;
  color: white;
}

.flash_message_error {
  height: 50px;
  background-color: rgb(202, 0, 0);
}

.flash_message_info {
  height: 50px;
  background-color: var(--primary);
  color: var(--secondary);
}

.flash_message_disabled {
  display: none;
}

.flash_message .close_message_button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0px;
  background-color: transparent;
  text-align: center;
}

.flash_message .close_message_button:hover {
  border: 2px solid black;
  border-radius: 25%;
}
</style>
