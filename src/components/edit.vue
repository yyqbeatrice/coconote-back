<template>
  <div class="page">
    <div id="e-left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
    </div>
    <div id="e-right">
      <div id="e-rightup">
        <div id="save"></div>
      </div>
      <div id="e-rightdown">
        <div id="words"></div>
      </div>
    </div>
  </div>
</template>

<style src="../css/edit.css"></style>

<script>
export default {
  name: 'EditPage',
  props: {
    msg: String
  }
}
</script>

