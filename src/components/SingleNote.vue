
<template>
  <div id="notepage">
    <div id="wrapper">
      <header>
        <div class="single-tag-wrapper">
          <div class="single-tag" v-for="tag in tags" :key="tag">{{tag}}</div>
        </div>
        <div class="single-time">2024.01.05</div>
      </header>
      <div id="seperate-line"></div>
      <main style="cursor: pointer;" @click="viewNoteDetail">
        <h1>{{ title }}</h1>
        <p>{{ abstract }}<br><br>代办事项:<br>1.我: 在本周二之前完成用户界面的设计，把设计稿上传到figma。之后和组员一起继续优化，特别是叫上杨老师一起。这个地方如果超过了会被隐藏，很显然我现在的height没有设置对</p>
      </main>
      <footer>
        <img src="../assets/time1.svg">
        <div>2.21 Tuesday</div>
      </footer>
      <!-- <div id="set-tag" v-if="isModifyTag"></div> -->
    </div>
  </div>
</template>

<style src="../css/singlenote.css"></style>

<script>
  export default {
    name: 'SingleNote',
    props: {
      title: null,
      abstract: null,
      todoList: [],
      tags: [],
      noteID: Number
    },
    data() {
      return {
        isModifyTag: false,
      }
    },
    methods: {
      modifyTag() {
        this.$data.isModifyTag = !this.$data.isModifyTag;
      },

      viewNoteDetail() {
        console.log('noteID:', this.noteID);

        const noteID = this.noteID;

        this.$router.push('edit?noteID='+noteID);
        // this.$router.push({ name: 'edit', query: { noteID: noteID } });
        // this.$router.push('edit');

      }
    }
  };
</script>