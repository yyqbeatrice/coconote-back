<template>
  <div class="page">
    <div id="upload-mask" v-if="uploading">
      <div id="gray-mask" @click="()=>{uploading=!uploading}"></div>
      <ModalWindow class="modal-overlay"></ModalWindow>
    </div>
    <div id="left">
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
    <div id="right">
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
      <div id="rightdown_left">
        <div id="rightdown_left_up">
        <MyCalendar @date-selected="handleDateSelected"/>
        </div>
        <div id="rightdown_left_down">
        
        <div class="card"></div>
        <img src="../assets/logo.svg" class="coco">
        </div>
      </div>
      <div id="rightdown_right">
        <div class="right_card"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<style src="../css/calendar.css"></style>

<script>
import MyCalendar from './MyCalendar.vue';
// import ModalWindow from "./Modal.vue"

export default {
  name: 'CalendarPage',
  components: {
    MyCalendar,
  },
  data() {
    return {
      uploading: false,
      // username: 'User',
      // avatar: '../assets/user.png',
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    logout() {
      // logout logic
    },
    handleDateSelected(date) {
      alert(`Selected date: ${date}`);
    },
  },
};
</script>


