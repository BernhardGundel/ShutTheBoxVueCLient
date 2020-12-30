<template>
  <div>
    <cell
      v-for="(cell, index) in matchfield"
      :key="index"
      v-bind:index="index"
      v-bind:isShut="cell"
      v-bind:isUpper="true"
      class="cell-flex cell">
    </cell>
    <br>
    <br>
    <div class="matchfield-divider"></div>
    <br>
    <cell
      v-for="(cell, index) in matchfield"
      :key="'s' + index"
      v-bind:index="index"
      v-bind:isShut="cell"
      v-bind:isUpper="false"
      class="cell-flex cell">
    </cell>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Cell from "@/components/Cell.vue";

export default Vue.component("matchfield", {
  components: {
    Cell
  },
  props: {
    matchfield: Array
  },
});
</script>

<style scoped lang="less">
.matchfield-container {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.matchfield-divider {
  width: 100%;
  height: 10%;
  border: 2px solid #888;
  border-radius: 999px;
}
</style>
