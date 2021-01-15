<template>
  <div>
    <div class="center">
      <div class="header bop">SHUT THE BOX</div>
      <div class="header-mirror bop2">SHUT THE BOX</div>
      <br />
      <div class="menu-items-container">
        <button class="text-center menu-button" @click="startGame()">
          LOS GEHTS!
        </button>
        <br />
        <br />
        <div>
          <input
            class="scale-2"
            type="checkbox"
            id="cb-matchfield"
            name="fieldsize"
          />
          <label for="cb-matchfield">Großes Spielfeld</label>
          <br />
          <input class="scale-2" type="checkbox" id="cb-ai" name="ai" />
          <label for="cb-ai">Gegen KI spielen</label>
        </div>
        <br />
        <button class="menu-button" @click="gotoRules()">SPIELREGELN</button>
        <br />
        <br />
        <button
          v-bind:class="getSoundEnabled"
          class="menu-button"
          @click="toggleSound()"
        ></button>
      </div>
    </div>
    <div>
      <button class="menu-button logout-btn" @click="logout()">LOGOUT</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.component("mainmenu", {
  components: {},
  props: {},
  mounted() {
      const cookie = document.cookie;
      console.log(cookie);
      if (!cookie.startsWith('authenticator=')) {
          this.$router.push("login");
      }
  },
  methods: {
    startGame() {
      this.$store.dispatch("startGame");
    },
    gotoRules() {
      this.$store.dispatch("sfxBtn");
      this.$router.push("rules");
    },
    toggleSound() {
      this.$store.dispatch("toggleSound");
    },
    logout() {
        this.$store.dispatch("logout");
    }
  },
  asyncComputed: {
    async getSoundEnabled() {
      return (await this.$store.dispatch("getSoundEnabled"))
        ? "sound-enabled-btn"
        : "sound-disabled-btn";
    },
  },
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
  font-size: 4rem;
  text-align: center;
  line-height: 4rem;
  white-space: nowrap;
}
.header-mirror {
  font-size: 4rem;
  text-align: center;
  color: #eee;
  transform: scale(1, -1);
}

.bop {
  animation: bop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite
    alternate;
}

.bop2 {
  animation: bop2 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards infinite
    alternate;
}

.logout-btn {
  position: absolute;
  top: 1.5%;
  right: 1.5%;
  font-size: 1rem;
}

.sound-enabled-btn {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: white;
  background-image: url(../assets/img/volume.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
}

.sound-disabled-btn {
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background-color: white;
  background-image: url(../assets/img/mute.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
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

@media only screen and (max-width: 375px) {
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