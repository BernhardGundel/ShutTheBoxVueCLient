<template>
  <div>
    <h1>Login</h1>
    E-Mail-Adresse:
    <br />
    <input placeholder="player@shutthebox.de" v-model="email" />
    <br /><br />
    Passwort:
    <br />
    <input type="password" v-model="password" />
    <div>
      <button @click="login()">LOGIN</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (value) => !!value || "Required.",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      //formData.append('rememberMe', true);
      this.$store.dispatch("login", formData);
    },
    googleLogin() {
      this.$store.dispatch("googleLogin");
    },
  },
};
</script>
