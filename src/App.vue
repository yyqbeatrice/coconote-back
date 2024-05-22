<template>
  <div>
    <router-link to="/tab1" id="lefttag">All Notes</router-link>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#lefttag {
  position: absolute;
  left: 0px;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 20px;
  color: #2c3e50;
}
</style>
