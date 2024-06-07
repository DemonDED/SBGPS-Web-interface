<script setup lang="ts">
import FooterElem from './components/Layout/FooterElem.vue';
import NavigationBar from './components/Layout/NavigationBar.vue';

</script>

<template>
  <navigation-bar />
  <router-view/>
  <footer-elem />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  @include flex(column);
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
