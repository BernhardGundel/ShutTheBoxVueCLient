<template>
    <div>
        <button class="cell-flex cell font-light" :disabled="!isUpper"
        v-bind:class="{ hidden: isShut&&isUpper||!isShut&&!isUpper }" @click="shut()">
        {{ index + 1 }}
        </button>
    </div>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.component("cell", {
  components: {},
  props: {
    isUpper: Boolean,
    isShut: Boolean,
    index: Number
  },
  methods: {
    shut() {
      this.checkCookie();
      return this.$store.dispatch("shut", this.index+1);
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
.cell {
  width: 2.5rem;
  height: 4rem;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
  border-radius: .5rem;
}

.cell:hover {
  filter: invert(1);
  transition: filter 0.3s ease;
}

.cell-flex {
  display: inline-flex;
  flex: 1;
  flex-direction: column;
}

.hidden {
  opacity: 0;
}

.font-light {
  font-weight: 300;
}

@media only screen
 and (max-width : 375px) {
  .cell {
    width: 1.75rem;
    height: 3rem;
  }
  .cell:hover {
      filter: invert(1);
      transition: filter 0.3s ease;
  }
 }
</style>