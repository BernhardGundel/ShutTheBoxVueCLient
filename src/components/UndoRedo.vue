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
      this.checkCookie();
      return this.$store.dispatch("undo");
    },
    redo() {
      this.checkCookie();
      return this.$store.dispatch("redo");
    },
    checkCookie() {
      this.$store.commit('checkSignedIn');
      if (this.$store.state.signedIn) {
        this.$router.push("login");
      } 
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