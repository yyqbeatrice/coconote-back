
<template>
  <div id="notepage" @click="modifyTag">
    <div id="wrapper">
      <header>
        <div class="single-tag-wrapper">
          <div class="single-tag">长文本</div>
        </div>
        <div class="single-time">2024.01.05</div>
      </header>
      <div id="seperate-line"></div>
      <main>
        <h1>一次讨论的笔记</h1>
        <p>课程233与爱丽丝和鲍勃的讨论笔记。我们总结了很多很多代办事项<br><br>代办事项:<br>1.我: 在本周二之前完成用户界面的设计，把设计稿上传到figma。之后和组员一起继续优化，特别是叫上杨老师一起。这个地方如果超过了会被隐藏，很显然我现在的height没有设置对</p>
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
    },
    data() {
      return {
        isModifyTag: false,
      }
    },
    methods: {
      modifyTag() {
        this.$data.isModifyTag = !this.$data.isModifyTag;
      }
    }
  };
</script>