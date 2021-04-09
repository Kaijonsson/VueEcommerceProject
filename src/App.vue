<template>
  <div id="app">
    <Navigator />
    <div id="overlay" v-if="chooseHistory" style="display: flex">
      <HistoryOverlay />
    </div>
    <router-view />
      <BottomFooter />
    
  </div>
</template>

<script>
import Navigator from "./components/app/navigator.vue";
import BottomFooter from "./components/BottomFooter.vue";
import HistoryOverlay from "./components/app/HistoryOverlay";

export default {
  components: {
    Navigator: Navigator,
    BottomFooter,
    HistoryOverlay,
  },
  computed: {
    chooseHistory() {
      return this.$store.state.chooseHistory;
    },
  },

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ffffff;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #d29914;
    }
  }
}
#overlay {
  position: fixed; 
  margin: 0 auto;

  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 2; 
  justify-content: center;
  align-items: center;
}
</style>
