import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import $ from "jquery";

Vue.use(Vuex);

const websocket = new WebSocket("ws://localhost:9000/websocket");

const SFX_SHUT = new Audio(require("../assets/sfx/shut.wav"));
const SFX_ROLL = new Audio(require("../assets/sfx/rollDice.mp3"));

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
  }
};

const store = new Vuex.Store({
  state: initState,
  mutations: {
    SET_CONTROLLER(state, controller) {
      state.controller = controller;
    }
  },
  actions: {
    startGame() {
      const checkBoxMatchfield = document.getElementById("cb-matchfield") as HTMLInputElement;
      const checkBoxAI = document.getElementById("cb-ai") as HTMLInputElement;
      const matchfieldBool = checkBoxMatchfield.checked;
      const aiBool = checkBoxAI.checked;
      websocket.send(JSON.stringify({"ai": aiBool, "bigMatchfield": matchfieldBool }));
      router.push("ingame");
    },

    shut({commit}, i) {
      websocket.send(JSON.stringify({"index": i}));
      this.dispatch('updateErrorMsg');
      SFX_SHUT.play();
    },

    rollDice() {
      websocket.send("rollDice");
      this.dispatch("updateDice");
      this.dispatch("updateErrorMsg");
      SFX_ROLL.play();
    },

    updateDice() {
      if (this.state.controller.dice) {
        const die1 = document.getElementById("die1");
        const die2 = document.getElementById("die2");
        (die1 as HTMLElement).innerHTML = this.state.controller.dice.die1.toString();
        (die2 as HTMLElement).innerHTML = this.state.controller.dice.die2.toString();
      }
    },

    resetErrorMsg() {
      const err = document.getElementById("err");
      if (err) {
        (err as HTMLElement).innerHTML = "ERROR";
        (err as HTMLElement).style.visibility = "hidden";
      }
    },

    updateErrorMsg() {
      const msg = this.state.controller.error;
      if (msg) {
        const err = document.getElementById("err") as HTMLElement;
        if (msg.length <= 1) {
          err.innerHTML = "ERROR";
          err.style.visibility = "hidden";
        } else {
          if (msg == "Dice roll not allowed") {
            err.innerHTML = "Würfeln ist noch nicht erlaubt!";
          } else if (msg == "This shut is not allowed") {
            err.innerHTML = "Dieser Spielzug ist nicht erlaubt";
          } else if (msg == "Please roll the dice first!") {
            err.innerHTML = "Bitte zuerst würfeln!";
          }
          err.style.visibility = "visible";
        }
      }
    },

    nextPlayer() {
      websocket.send("nextPlayer");
      if (this.state.controller.turn < 1) {
        store.dispatch("resetErrorMsg");
      } else {
        router.push("scoreboard");
      }
    },

    undo() {
      websocket.send("undo");
      store.dispatch("updateErrorMsg");
    },

    redo() {
      websocket.send("redo");
      store.dispatch("updateErrorMsg");
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

      if (store.state.controller.turn > 1) {
          //location.href = "/scoreboard";
          router.push("scoreboard");
      }
  }
};

export default store;