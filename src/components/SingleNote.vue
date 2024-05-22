
<template>
  <div id="notepage" @click="modifyTag">
    <div id="set-tag" v-if="isModifyTag"></div>
  </div>
</template>

<style src="../css/content.css"></style>

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