<template>
  <div class="center text-center">
        <div class="font-large"><u>GAME OVER!</u></div>
        <br>
        <div class="font-medium">Spieler 1: {{ scorePlayer1 }} Punkte</div>
        <div class="font-medium">Spieler 2: {{ scorePlayer2 }} Punkte</div>
        <br><br><br>
          <div v-if="scorePlayer1 == scorePlayer2" class="font-medium">{{ playAaw() }} Das Spiel endet unentschieden :-(</div>
        <div v-if="scorePlayer1 < scorePlayer2" class="font-medium">{{ playCheer() }} Spieler 1 gewinnt!</div>
        <div v-if="scorePlayer1 > scorePlayer2" class="font-medium">{{ playCheer() }} Spieler 2 gewinnt!</div>
        <br>
        <br>
        <br>
        <button @click="gotoMenu()" class="menu-button">ZURÜCK ZUM HAUPTMENÜ</button>
    </div>
</template>

<script lang="ts">
  export default {
      name: 'Scoreboard',
      methods: {
        gotoMenu() {
          this.$store.dispatch("sfxBtn");
          this.$router.push("/");
        },
        playCheer() {
          this.$store.dispatch("sfxCheer");
        },
        playAaw() {
          this.$store.dispatch("sfxAaw");
        }
      },
      computed: {
        scorePlayer1() {
          return this.$store.state.controller.score.scorePlayer1
        },
        scorePlayer2() {
          return this.$store.state.controller.score.scorePlayer2
        }
      },
  }
</script>

<style scoped lang="less">
.font-large {
    font-size: 4rem;
}

.font-medium {
    font-size: 2rem;
}

.center {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
}

.text-center {
    text-align: center;
}

</style>