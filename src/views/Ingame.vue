<template>
  <div>
    <button
      class="menu-button back-to-menu-button"
      @click="backToMenu()"
    ></button>
    <undo-redo></undo-redo>
    <div
      v-if="getAIEnabled && playername == 'KI'"
      class="disabledMatchfield"
    ></div>
    <div
      v-if="getAIEnabled && playername == 'KI'"
      class="disabledUndoRedo"
    ></div>
    <div id="shutthebox-game" class="matchfield-container">
      <div class="text-large">
        <u>{{ playername }}</u> ist an der Reihe
      </div>
      <br />
      <matchfield v-bind:matchfield="matchfield"></matchfield>
      <br />
      <dice></dice>
    </div>
  </div>
</template>

<script lang="ts">
import Matchfield from "@/components/Matchfield.vue";
import Dice from "@/components/Dice.vue";
import UndoRedo from "@/components/UndoRedo.vue";

export default {
  name: "Ingame",
  components: {
    Matchfield,
    Dice,
    UndoRedo,
  },
  mounted() {
    const cookie = document.cookie;
    if (!(document.cookie.startsWith("authenticator=")||document.cookie.startsWith("OAuth2State"))) {
      this.$router.push("login");
    }
  },
  methods: {
    backToMenu() {
      this.$store.dispatch("sfxBtn");
      this.$router.push("/");
    },
  },
  computed: {
    matchfield() {
      return this.$store.state.controller.field;
    },
  },
  asyncComputed: {
    async playername() {
      return await this.$store.dispatch("getCurrentPlayerName");
    },
    async getAIEnabled() {
      return await this.$store.state.controller.ai;
    },
  },
};
</script>

<style scoped lang="less">
.matchfield-container {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.back-to-menu-button {
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: white;
  background-image: url(../assets/img/arrow-left.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
}

.text-large {
  font-size: 2rem;
}

.disabledMatchfield {
  z-index: 999;
  cursor: not-allowed;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 80%;
  transform: translate(-50%, -50%);
  //background-color: #ff0000aa;
}

.disabledUndoRedo {
  z-index: 999;
  cursor: not-allowed;
  position: absolute;
  width: 7.25rem;
  height: 2.5rem;
  top: 2.5%;
  right: 2.5%;
  //background-color: #ff0000aa;
}

.input-disabled {
  cursor: not-allowed;
  pointer-events: none;
}
</style>