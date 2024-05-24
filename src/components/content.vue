<template>
  <div class="page">
    <div id="upload-mask" v-if="uploading">
      <div id="gray-mask" @click="()=>{uploading=!uploading}"></div>
      <ModalWindow class="modal-overlay"></ModalWindow>
    </div>
    <div id="left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div id="menu">
        <div class="active-item">
          <img src="../assets/all_notes_active.svg">
          <p @click="goToPage('/')">All Notes</p>
        </div>
        <div class="item">
          <img src="../assets/calendar.svg">
          <p @click="goToPage('/Calendar')">Calendar</p>
        </div>
        <div class="item">
          <img src="../assets/delete.svg">
          <p @click="goToPage('/Trash')">Trash</p>
        </div>
        <button @click="()=>{uploading=!uploading}" id='new-page-button'>+ New</button>
        <div class="item">
          <img src="../assets/signout.svg">
          <p @click="goToPage('/Trash')">Sign Out</p>
        </div>
      </div>
    </div>
    <div id="right">
      <div id="rightup">
        <div id="search"><img src="../assets/search.svg" alt="search"></div>
        <div id="user">
          <p id="username">
            {{ username }}
          </p>
          <img src="../assets/img_test.jpeg" alt="user" class="userimg">
        </div>
      </div>
      <div id="rightdown">
        <div id="tag-wrapper">
          <div id="test" class="active-tag">All</div>
          <div id="tag1" class="tag" :class="{ 'active-tag': current_tag === '1' }" @click="handlechange('long')">Tag1</div>
          <div id="tag2" class="tag" :class="{ 'active-tag': current_tag === '2' }" @click="handlechange('favor')">Tag2</div>
        </div>
        <div id="frame">
          <template v-for="x in pagenum" :key="x">
            <SingleNote v-if="x['tags'].includes(current_tag)"></SingleNote>
            <!-- <p>{{ current_tag }}</p> -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../css/content.css"></style>

<script>
import SingleNote from "./SingleNote.vue";
import ModalWindow from "./Modal.vue"

export default {
  name: 'ContentPage',
  components: {
    SingleNote,
    ModalWindow
  },
  props: {
  },
  data() {
    return {
      username: 'UserName',
      pagenum: [{id: 1, content: 'hello', tags:['long', 'favor']},
      {id: 2, content: 'hello2', tags:['long', 'favor2']},
      {id: 3, content: 'hello3', tags:['long', 'favor3']}],
      current_tag: 'long',
      current_active_id: null,
      uploading: false
    }
  },
  computed: {
    
  },
  methods: {
    handlechange: function(e) {
      this.$data.current_tag = e;
      console.log(this.$data.current_tag);
  },
  goToPage: function(page_name) {
    this.$router.push(page_name);
    }
  }
}
</script>
