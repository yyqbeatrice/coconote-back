<template>
  <div class="page">
    <div id="left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div>
        <p @click="goToPage('/')">All Notes</p>
        <p @click="goToPage('/Calendar')">Calendar</p>
        <p @click="goToPage('/Trash')">Trash</p>
        <button @click="goToPage('/NewPage' )" id='new-page-button'>+ New Note</button>
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
        <div id="tag">
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
export default {
  name: 'ContentPage',
  components: {
    SingleNote,
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
      current_active_id: null
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
