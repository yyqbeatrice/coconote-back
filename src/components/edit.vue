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
        <img src="../assets/return.svg" @click="goToPage('/Content')" class="return">
        <img src="../assets/delete_active.svg" class="delete">
        <button class='save' @click="saveNote">Save</button>
      </div>
      <div id="e-rightdown">
        <input type="note_text" v-model="title" placeholder="Title" class="title-input">
        <div id="note_content">
          <textarea v-model="content" placeholder="Content" class="content-input"></textarea>
          <div id="todo">
            <div id="todo_my">
              <p class="my_title">MY TO-DO LIST</p>
              <div class="my"></div>
            </div>
            <div id="todo_other">
              <p class="other_title">OTHERS' TO-DO LIST</p>
              <div class="other"></div>
            </div>
          </div>
        </div>
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
      addTag: null,
      title: '', 
      content: ''
      // tags: []
    }
  },
  methods: {
    saveTag(){
      this.tags.push(this.addTag);
      this.addTag = null;
    },

    saveNote() {
      // Log the note data
      console.log('Title:', this.title);
      console.log('Content:', this.content);
      console.log('Tags:', this.tags);
      
      // Return the note data
      return {
        title: this.title,
        content: this.content,
        tags: this.tags
      };
    },

    goToPage: function(page_name) {
      this.$router.push(page_name);
    }
  }
}
</script>



