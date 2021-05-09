<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'App',
}
</script>
<style lang="scss">
@import "./src/assets/style/public";
body{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
