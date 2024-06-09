<template>
  <div class="content-page">
    <div id="upload-mask" v-if="uploading">
      <div id="gray-mask" @click="()=>{uploading=!uploading}"></div>
      <ModalWindow class="modal-overlay"></ModalWindow>
    </div>
    <div id="content-left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div id="content-menu">
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
          <p @click="logout">Sign Out</p>
        </div>
      </div>
    </div>
    <div id="content-right">
      <div id="rightup">
        <!-- <div id="search"><img src="../assets/search.svg" alt="search"></div> -->
        <div id="user">
          <p id="username">
            {{ username }}
          </p>
          <div class="userimg">
            <img :src="avatar" alt="user">
          </div>
        </div>
      </div>
      <div id="rightdown">
        <div id="tag-wrapper">
          <div id="test" class="active-tag">All</div>
          <div id="tag1" class="tag" :class="{ 'active-tag': current_tag === '1' }" @click="handlechange('long')">Tag1</div>
          <div id="tag2" class="tag" :class="{ 'active-tag': current_tag === '2' }" @click="handlechange('favor')">Tag2</div>
        </div>
        <div id="frame">
          <template v-for="x in allNotes" :key="x">
            <SingleNote v-if="x['tag'].includes(current_tag) || current_tag === null"
              :title="x['title']"
              :tags="x['tag']"
              :abstract="x['abstract']"
              :noteID="x['note_id']">
            </SingleNote>
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
    ModalWindow,
  },
  props: {
  },
  data() {
    return {
      username: null,
      avatar: null,
      // allNotes: [],
      allNotes: [{title: "你好", tag: ["long"], abstract: "没有啊"}],
      current_tag: null,
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
    },

    logout() {
      this.$store.dispatch('logout');
      window.alert('Log out succeed!');
      this.$router.push('/');
    },
  },
  created() {
    /*
    Get: 
    1. User's avatar/username
    2. All notes
    */
    if(!this.$store.getters.userID) {
      window.alert('Please log in!');
      this.$router.push('/');
      return;
    }

    // 使用箭头函数以避免 this 问题
    // user info
    this.$axios.get('/api/user-info').then(response => {
      const responseData = response.data;
      this.avatar = responseData.avatar;
      this.username = responseData.username;
    }).catch(error => {
      window.alert(error);
    });

    // all notes
    this.$axios.get('/api/all-notes').then(response => {
      const responseData = response.data;
      console.log(responseData.notes);
      this.allNotes = responseData.notes;
    }).catch(error => {
      window.alert(error);
    });
  },
}
</script>
