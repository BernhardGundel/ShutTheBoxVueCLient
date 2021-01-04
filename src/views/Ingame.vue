<template>
  <div>
      <button class="menu-button back-to-menu-button" @click="backToMenu()"></button>
        <undo-redo></undo-redo>
      <div id="shutthebox-game" class="matchfield-container">
          <matchfield v-bind:matchfield="matchfield"></matchfield>
          <br>
          <dice></dice>
      </div>
  </div>
</template>

<script lang="ts">
    import Matchfield from '@/components/Matchfield.vue';
    import Dice from '@/components/Dice.vue';
    import UndoRedo from '@/components/UndoRedo.vue';

    export default {
        name: 'Ingame',
        components: {
            Matchfield,
            Dice,
            UndoRedo
        },
        methods: {
          backToMenu() {
            this.$store.dispatch("sfxBtn");
            this.$router.push("/");
          }
        },
        computed: {
          matchfield() {
              return this.$store.state.controller.field
          }
        }
    }
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
    padding: .5rem;
    background-color: white;
    background-image: url(../assets/img/arrow-left.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
}
</style>