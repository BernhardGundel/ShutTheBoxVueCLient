<template>
  <div class="undo-redo-button-container">
    <button type="button" class="btn btn-outline-dark" @click="undo()">UNDO</button>
    <button type="button" class="btn btn-outline-dark" @click="redo()">REDO</button>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.component("undo-redo", {
  components: {},
  methods: {
    undo() {
      return this.$store.dispatch("undo");
    },
    redo() {
      return this.$store.dispatch("redo");
    }
  }
});
</script>

<style scoped lang="less">
  .undo-redo-button-container {
    position: absolute;
    top: 2.5%;
    right: 2.5%;
}
</style>