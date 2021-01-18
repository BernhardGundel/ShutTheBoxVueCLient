<template>
    <div>
        <br>
        <div id="err" class="alert alert-danger text-center" role="alert"></div>
        <div class="dice-container">
            <div id="die1" class="dice">
            </div>
            <div id="die2" class="dice">
            </div>
            <br>
            <br>
            <div class="dice-container">
                <button class="menu-button" @click="rollDice()">WÜRFELN!</button>
                <br><br>
                <div class="row justify-content-center">
                    <button class="btn btn-outline-dark btn-lg" @click="nextPlayer()">NÄCHSTER SPIELER</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("dice", {
  components: {},
  props: {
    die1: Number,
    die2: Number,
  },
  mounted() {
    this.$store.dispatch("resetErrorMsg");
  },
  methods: {
    rollDice() {
      this.checkCookie();
      return this.$store.dispatch("rollDice");

    },
    nextPlayer() {
      this.checkCookie();
      this.$store.dispatch("sfxBtn");
      return this.$store.dispatch("nextPlayer");
    },
    checkCookie() {
      this.$store.commit('checkSignedIn');
      if (!(this.$store.state.signedIn||document.cookie.startsWith("OAuth2State"))) {
        this.$router.push("login");
      } 
    }
  }
});
</script>

<style scoped lang="less">
.dice-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.dice {
  display: inline-block;
  text-align: center;
  border: 1px solid #999;
  border-radius: 1rem;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  line-height: 4rem;
  background-color: #ccc;
  user-select: none;
}
</style>