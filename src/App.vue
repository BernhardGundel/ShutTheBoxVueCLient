<template>
  <div id="app">
    <particles/>
    <router-view/>
  </div>
</template>

<script>
import particles from "./components/particles";

export default {
  name: "ShutTheBox",
  components: {
    particles
  }
};
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html * {
  font-family: 'Londrina Solid', cursive;
}

button {
  outline: none !important;
}

.menu-button {
  width: 10em;
  height: 3em;
  font-size: 1.5em;
  border: 2px solid black;
  border-radius: .5em;
  outline: none;
  background-color: white;
}

.menu-button:hover {
  animation: wobble 0.4s ease-in-out;
  filter: invert(1);
  transition: filter 0.3s ease;
}

@keyframes wobble {
  0% {
      transform: scale(1);
  }
  50% {
      transform: scale(1.1);
  }
  100% {
      transform: scale(1);
  }
}

input[type="checkbox"] {
  filter: grayscale(100%);
}

/*********************
 * RESPONSIVE DESIGN *
 *********************/

 /* Smartphones (portrait) */
 @media only screen
 and (max-width : 375px) {
    .center {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translate(-50%, 0%);
    }

    .header {
        line-height: 4rem;
        white-space: nowrap;
    }
    .header-mirror {
        line-height: 4rem;
        white-space: nowrap;
    }

    .cell {
        width: 1.75rem;
        height: 3rem;
    }

    .cell:hover {
        filter: invert(1);
        transition: filter 0.3s ease;
    }

    .cell-shut {
        width: 1.75rem;
        height: 3rem;
        transform: scale(1, -1);
    }

    .matchfield-container {
        position: absolute;
        top: 35%;
        left: 0%;
        transform: translate(0%, -50%);
        margin-left: 0.125rem;
        width: 100%;
    }
    .dice-container {
         position: absolute;
         left: 50%;
         transform: translateX(-50%);
    }

    .font-large {
        font-size: 3rem;
        white-space: nowrap;
    }

    .font-medium {
         font-size: 1.75rem;
     }
}

</style>
