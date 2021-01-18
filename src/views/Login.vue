<template>
  <div>
    <h1>Login</h1>
    <form id="loginform">
      E-Mail-Adresse:
      <br />
      <input placeholder="player@shutthebox.de" v-model="email" />
      <br /><br />
      Passwort:
      <br />
      <input type="password" v-model="password" />
      <br /><br />
      <button @click="login()">LOGIN</button>
    </form>
    <button @click="googleLogin()">LOGIN MIT GOOGLE</button>
    <br><br>
    Noch keinen Account? <br>
    <button @click="gotoSignup()">REGISTRIEREN!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
  mounted() {
    //this.$store.commit('checkSignedIn');
    //if (!this.$store.state.signedIn) {
    //  this.$router.push("/");
    //}
  },

  methods: {
    login() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);
      this.$store.dispatch("login", formData);
    },
    googleLogin() {
      this.$store.dispatch("googleLogin");
    },
    gotoSignup() {
      this.$router.push("signup");
    }
  },
};
</script>
