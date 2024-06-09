<template>
  <div class="cld-page">
    <div id="cld-upload-mask" v-if="uploading">
      <div id="cld-gray-mask" @click="()=>{uploading=!uploading}"></div>
      <ModalWindow class="cld-modal-overlay"></ModalWindow>
    </div>
    <div id="cld-left">
      <div id="cld-logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div id="cld-content-menu">
        <div class="cld-item">
          <img src="../assets/all_notes.svg">
          <p @click="goToPage('/')">All Notes</p>
        </div>
        <div class="cld-active-item">
          <img src="../assets/calendar_active.svg">
          <p @click="goToPage('/Calendar')">Calendar</p>
        </div>
        <div class="cld-item">
          <img src="../assets/delete.svg">
          <p @click="goToPage('/Trash')">Trash</p>
        </div>
        <button @click="()=>{uploading=!uploading}" id='new-page-button'>+ New</button>
        <div class="cld-item">
          <img src="../assets/signout.svg">
          <p @click="logout">Sign Out</p>
        </div>
      </div>
    </div>
    <div id="cld-right">
      <div id="cld-rightup">
        <!-- <div id="search"><img src="../assets/search.svg" alt="search"></div> -->
        <div id="cld-user">
          <p id="cld-username">
            {{ username }}
          </p>
          <div class="cld-userimg">
            <img :src="avatar" alt="user">
          </div>
        </div>
      </div>
      <div id="cld-rightdown">
      <div id="cld-rightdown_left">
        <div id="cld-rightdown_left_up">
        <MyCalendar @date-selected="handleDateSelected"
        :selfDDL="myTodoDates"
        :othersDDL="othersTodoDates"/>
        </div>
        <div id="cld-rightdown_left_down">
        
        <div class="cld-card">
          <header v-if="todayNotes.length>0" class="cld-card-title">
            <div>{{ month }} {{ date }}</div>
            <div>Notes</div>
          </header>
          <main>
            <div class="cld-note" v-for="note in todayNotes" :key="note">
              <div class="cld-bullet-point"></div>
              <p><span>{{ note.title }}</span> <span class="cld-note-time">{{ note.date.slice(-12, -4) }}</span></p>
            </div>
          </main>
        </div>
        <img src="../assets/logo.svg" class="cld-coco">
        </div>
      </div>
      <div id="cld-rightdown_right">
        <div class="cld-right_card"></div>
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

      myTodoListTotal: [], //{content: xxx, ddl: xxx, item_id: xxx}
      othersTodoListTotal: [],

      myTodoNote: [], // {title: xxx, ddl: xxx, content: xxx}
      othersTodoNote: [], // {title: xxx, ddl: xxx, content: xxx}

      todayNotes: [], // {date, note_id, own_by, title}

      myTodoDates: [],
      othersTodoDates: [],
      month: null,
      date: null,
      showDDL: false
    };
  },
  computed: {
    todoNote(){
      // const todoNotes = [];
      // this.myTodoList.forEach(element => {
        
      // });

      return {

      }
    }
  },
  created(){
    this.$axios.get('/api/all_todo').then(response => {
      const responseData = response.data;
      const items = responseData.items;
      items.forEach(item => {
        if(item.is_self){
          this.myTodoListTotal.push({
            content: item.content,
            ddl: item.ddl,
            item_id: item.item_id
          });
          this.myTodoDates.push(item.ddl);
        }
        else{
          this.othersTodoListTotal.push({
            content: item.content,
            ddl: item.ddl,
            item_id: item.item_id
          });
          this.othersTodoDates.push(item.ddl);
        }
        console.log(this.myTodoDates)
      });
    }).catch(error => {
      window.alert(error);
    });
  },
  methods: {
    goToPage(page) {
      this.$router.push(page);
    },
    logout() {
      // logout logic
    },
    handleDateSelected(dateParam) {
      // show relative information
      this.date = dateParam.date;
      this.month = dateParam.month;
      const dateStr = dateParam.dateStr;

      // get the note accordingly
      const params = {
        date: dateStr
      }
      this.$axios.get('/api/get-note-by-date', { params }).then(response => {
        const responseData = response.data;
        this.todayNotes = responseData.notes;
        console.log(this.todayNotes);
      }).catch(error => {
        window.alert(error);
      });
      
      if(dateParam.hasMyDDL){
        let itemIdList = [];
        this.showDDL = true;
        console.log(this.myTodoListTotal);
        this.myTodoListTotal.forEach(element => {
          if(element.ddl == dateStr) {
            itemIdList.push(element.item_id);
          }
        });
        // send reqest to get note info

        console.log(itemIdList);
      }
      if(dateParam.hasOtherDDL) {
        let itemIdList = [];
        this.showDDL = true;
        this.othersTodoListTotal.forEach(element => {
          if(element.ddl == dateStr) {
            itemIdList.push(element);
          }
        });
      }
      else {
        this.showDDL = false;
        this.myTodoList = [];
        this.othersTodoList = [];
      }
      
      console.log('this.weekDay:');
      console.log(this.weekday);
    },
  },
};
</script>


