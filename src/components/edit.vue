<template>
  <div class="page">
    <div id="e-left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div id="e-menu">
        <div class="active-item">
          <img src="../assets/AI.svg">
          <p @click="goToPage('/')">AI Note</p>
        </div>
        <div class="item">
          <img src="../assets/calendar.svg">
          <p @click="goToPage('/Calendar')">Transcript</p>
        </div>
        <div class="tags">
          <h2>Tags</h2>
          <div class="tag-item" v-for="tag in tags" :key="tag">{{ tag }}</div>
          <input class="tag-item" placeholder="Add Tag" v-model="addTag" @blur="saveTag">
        </div>
      </div>
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
    msg: String,
  },
  data(){
    return {
      tags: ['happy', 'you'],
      addTag: null
      // tags: []
    }
  },
  methods: {
    saveTag(){
      this.tags.push(this.addTag);
      this.addTag = null;
    }
  }
}
</script>

