<template>
  <div>
    <button
        class="menu-button back-to-login-button"
        @click="backToLogin()"
      ></button>
    <div class="center">
      <h1>Registrieren</h1>
      <form id="signupform">
        Vorname:
        <br />
        <input placeholder="Max" v-model="firstname" />
        <br /><br />
        Nachname:
        <br />
        <input placeholder="Mustermann" v-model="lastname" />
        <br /><br />
        E-Mail-Adresse:
        <br />
        <input placeholder="player@shutthebox.de" v-model="email" />
        <br /><br />
        Passwort:
        <br />
        <input type="password" v-model="password" />
      </form>
      <button @click="register()">ANMELDEN</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
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
    this.$store.commit('checkSignedIn');
      if (this.$store.state.signedIn) {
        this.$router.push("/");
    }
  },

  methods: {
    register() {
      const formData = new FormData();
      formData.append("firstName", this.firstname);
      formData.append("lastName", this.lastname);
      formData.append("email", this.email);
      formData.append("password", this.password);
      this.$store.dispatch("register", formData);
    },
    backToMenu() {
      this.$store.dispatch("sfxBtn");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
  .center {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  .back-to-login-button {
    position: absolute;
    top: 2.5%;
    left: 2.5%;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    background-color: white;
    background-image: url(../assets/img/arrow-left.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: content-box;
  }
</style>
