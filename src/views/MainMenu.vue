<template>
    <div class="center">
    <div class="header bop">SHUT THE BOX</div>
    <div class="header-mirror bop2">SHUT THE BOX</div>
    <br>
    <div class="menu-items-container">
        <button class="text-center menu-button" @click="startGame()">LOS GEHTS!
        </button>
        <br>
        <br>
        <input class="scale-2" type="checkbox" id="cb-matchfield" name="fieldsize">
        <label for="cb-matchfield">Großes Spielfeld</label>
        <br>
        <input class="scale-2" type="checkbox" id="cb-ai" name="ai">
        <label for="cb-ai">Gegen KI antreten</label>
        <br>
        <br>
        <button class="menu-button" onclick="location.href='/rules'">SPIELREGELN</button>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("mainmenu", {
  components: {},
  props: {},
  methods: {
    startGame() {
      return this.$store.dispatch("startGame");
    }
  }
});
</script>

<style scoped lang="less">
    .center {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -25%);
    }

    .scale-2 {
        margin: 1rem;
        transform: scale(2);
    }

    .header {
        line-height: 4rem;
        white-space: nowrap;
    }
    .header-mirror {
        line-height: 4rem;
        white-space: nowrap;
    }

    .bop {
    animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
    }

    .bop2 {
        animation: bop2 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite alternate;
    }

    @keyframes bop {
        0% {
            transform: scale(0.75);
        }
        50%,
        100% {
        transform: scale(1);
        }
    }

    @keyframes bop2 {
        0% {
            transform: scale(1, -0.75);
        }
        50%,
        100% {
            transform: scale(1, -1);
        }
    }

    @media only screen and (min-width : 667px) {
        .menu-button {
        font-size: 1rem;
        }

        .header {
        font-size: 2rem;
        line-height: 2rem;
        white-space: nowrap;
        }

        .header-mirror {
        font-size: 2rem;
            line-height: 2rem;
            white-space: nowrap;
        }
    }
</style>