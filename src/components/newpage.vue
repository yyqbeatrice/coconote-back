<template>
  <div class="page">
    <div id="n-left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
    </div>
    <div id="n-right">
      <div id="n-rightup">
        <div id="save"></div>
      </div>
      <div id="n-rightdown">
        <div id="words"></div>
      </div>
    </div>
  </div>
</template>

<style src="../css/newpage.css"></style>

<script>
export default {
  name: 'NewPage',
  props: {
    msg: String
  }
}
</script>

