import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import $ from "jquery";
import axios from "axios";

Vue.use(Vuex);

const server = "shuttheboxserver.herokuapp.com"
const websocket = new WebSocket("wss://" + server + "/websocket");
const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  crossdomain: true
};


const SFX_SHUT = new Audio(require("../assets/sfx/shut.wav"));
const SFX_ROLL = new Audio(require("../assets/sfx/rollDice.mp3"));
const SFX_BTN = new Audio(require("../assets/sfx/btn.mp3"));
const SFX_CHEER = new Audio(require("../assets/sfx/cheer.mp3"));
const SFX_AAW = new Audio(require("../assets/sfx/aaw.mp3"));

const initState = {
  controller: {
    ai: false,
    bigMatchfield: false,
    field: [],
    dice: {
      die1: 0,
      die2: 0
    },
    score: {
      scorePlayer1: 0,
      scorePlayer2: 0
    },
    turn: 0,
    error: ""
  },
  enableSound: true,
  cookie: document.cookie,
};

const store = new Vuex.Store({
  state: initState,
  mutations: {
    SET_CONTROLLER(state, controller) {
      state.controller = controller;
    },
    SET_COOKIE(state, cookie) {
      state.cookie = cookie
    }
  },
  actions: {
    checkSignedIn({commit}) {
      axios.get("https://" + server + "/checkSignedIn", axiosConfig)
      .then((response) => {
        commit('SET_LOGIN', true);
      })
      .catch(error => {
        console.log("Du bist nicht eingeloggt.");
      })
    },

    login({ commit }, user) {
      axios.post("https://" + server + "/signIn", user, $.extend(axiosConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
        .then((response) => {
          console.log("Headers: ", response.headers);
          commit('SET_COOKIE', document.cookie)
          router.push("/");
        })
        .catch(function (response) {
          console.log("Da ist etwas schief gelaufen.");
        });
    },

    logout({ commit }) {
      axios.get("https://" + server + "/signOut", axiosConfig)
        .then(() => {
          router.push("/login");
          commit('SET_COOKIE', document.cookie)
        })
        .catch(() => {
          console.log("Something went wrong");
        })
    },

    register({ commit }, user) {
      axios.post("https://" + server + "/signUp", user, $.extend(axiosConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      ))
        .then(function () {
          router.push("/login");
        }.bind(this))
        .catch(() => {
          console.log("Something went wrong");
        });
    },

    googleLogin({ commit }) {
      axios.get("https://" + "localhost:9000" + "/authenticate/google",
        $.extend(axiosConfig, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }))
        .then(function (response) {
          commit('SET_COOKIE', document.cookie)
          if (store.getters.isLoggedIn) {
            window.location.replace("/");
          }
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    },

    startGame({ dispatch }) {
      if (websocket.OPEN) {
        const checkBoxMatchfield = document.getElementById("cb-matchfield") as HTMLInputElement;
        const checkBoxAI = document.getElementById("cb-ai") as HTMLInputElement;
        const matchfieldBool = checkBoxMatchfield.checked;
        const aiBool = checkBoxAI.checked;
        websocket.send(JSON.stringify({ "ai": aiBool, "bigMatchfield": matchfieldBool }));
        router.push("ingame");
      } else {
        location.reload();
      }
      dispatch("sfxBtn");
    },

    shut({ dispatch }, i) {
      websocket.send(JSON.stringify({ "index": i }));
      dispatch("sfxShut");
    },

    rollDice({ dispatch }) {
      websocket.send("rollDice");
      store.dispatch("updateDice");
      dispatch("sfxRoll");
    },

    updateDice() {
      if (this.state.controller.dice) {
        const die1 = document.getElementById("die1");
        const die2 = document.getElementById("die2");
        if (die1 && die2) {
          (die1 as HTMLElement).innerHTML = this.state.controller.dice.die1.toString();
          (die2 as HTMLElement).innerHTML = this.state.controller.dice.die2.toString();
        }
      }
    },

    resetErrorMsg() {
      const err = document.getElementById("err") as HTMLElement;
      if (err) {
        err.style.visibility = "hidden";
      }
    },

    updateErrorMsg({ dispatch }) {
      const msg = this.state.controller.error;
      if (msg) {
        const err = document.getElementById("err") as HTMLElement;
        if (err) {
          if (msg.length <= 1) {
            dispatch("resetErrorMsg");
          } else {
            if (msg == "Dice roll not allowed!") {
              err.innerHTML = "Würfeln ist noch nicht erlaubt!";
            } else if (msg == "This shut is not allowed") {
              err.innerHTML = "Dieser Spielzug ist nicht erlaubt";
            } else if (msg == "Please roll the dice first!") {
              err.innerHTML = "Bitte zuerst würfeln!";
            }
            err.style.visibility = "visible";
          }
        }
      }
    },

    nextPlayer({ dispatch }) {
      websocket.send("nextPlayer");
    },

    getCurrentPlayerName() {
      if (store.state.controller.turn == 0) {
        return "Spieler 1";
      } else {
        if (store.state.controller.ai) {
          return "KI";
        } else {
          return "Spieler 2";
        }
      }
    },

    undo({ dispatch }) {
      dispatch("sfxBtn");
      websocket.send("undo");
    },

    redo({ dispatch }) {
      dispatch("sfxBtn");
      websocket.send("redo");
    },

    sfxShut() {
      if (store.state.enableSound) {
        SFX_SHUT.play();
      }
    },

    sfxRoll() {
      if (store.state.enableSound) {
        SFX_ROLL.play();
      }
    },

    sfxBtn() {
      if (store.state.enableSound) {
        SFX_BTN.play();
      }
    },

    sfxCheer() {
      if (store.state.enableSound) {
        SFX_CHEER.play();
      }
    },

    sfxAaw() {
      if (store.state.enableSound) {
        SFX_AAW.play();
      }
    },

    toggleSound() {
      store.state.enableSound = !store.state.enableSound;
    },

    getSoundEnabled() {
      return store.state.enableSound;
    }
  },

  getters: {
    matchfield: state => {
      return state.controller.field;
    }
  }
});

websocket.onopen = () => {
  console.log("Connected to Websocket");
};

websocket.onclose = () => {
  console.log("Connection with Websocket Closed!");
  // Workaround for websocket timeout
  console.log(location.href);
  if (!location.href.endsWith("login") && !location.href.endsWith("signup")) {
    //location.reload();
  }
};

websocket.onerror = error => {
  console.log("Error in Websocket Occured: " + error);
};

websocket.onmessage = e => {
  if (typeof e.data === "string") {
    const response = JSON.parse(e.data);
    console.log(response);
    store.commit("SET_CONTROLLER", response);
    store.dispatch("updateDice");
    store.dispatch("updateErrorMsg");

    // needed for AI to finish current game
    if (store.state.controller.turn > 1) {
      if (!router.currentRoute.path.endsWith("scoreboard")) {
        router.push("scoreboard");
      }
    }
  }
};

export default store;