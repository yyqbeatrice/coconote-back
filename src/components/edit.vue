<template>
  <div class="page">
    <div id="e-left">
      <div id="logo"><img src="../assets/coconote.svg" alt="logo"></div>
      <div id="e-menu">
        <div class="active-item">
          <img v-if="showTranscript" src="../assets/AI.svg">
          <img v-else src="../assets/AI_activte.svg">
          <p @click="showTranscript = false" :style="!showTranscript ? {'color': '#60B71C', 'font-weight': 'bold'} : {'color': 'black', 'font-weight': 'bold'}">AI Note</p>
        </div>
        <div class="item">
          <img v-if="showTranscript" src="../assets/journal-richtext-active.svg">
          <img v-else src="../assets/journal-richtext.svg">
          <p @click="showTranscript = true" :style="showTranscript ? {'color': '#60B71C', 'font-weight': 'bold'} : {'color': 'black', 'font-weight': 'bold'}" >Transcript</p>
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
        <img src="../assets/return.svg" @click="goToPage('/content')" style="cursor: pointer;" class="return">
        <img src="../assets/delete_active.svg" class="delete" style="cursor: pointer;">
        <button class='save' @click="saveNote" style="cursor: pointer;" >Save</button>
      </div>
      <div id="e-rightdown">
        <input type="note_text" v-model="title" placeholder="Title" class="title-input">
        <div id="note_content">
          <div id="editor">
            <QuillEditor 
            v-if="!showTranscript"
            v-model:content="content"
            content-type="html"
            theme="snow"
            placeholder="Input your content here"/>
            <QuillEditor 
            v-else
            :content="transcript"
            content-type="html"
            theme="snow"
            read-only="True"/>
          </div>
          <div id="todo">
            <div id="todo_my">
              <p class="my_title">MY TO-DO LIST</p>
              <div class="my">
                <div v-for="(todoItem, index) in myTodoList" :key="todoItem" class="todo-item active">
                  <div class="todo-item-content active">
                    <input :id="'input_active' + index" type="date" v-model="todoItem.ddl"/>
                    <p>{{ todoItem.content }}</p>
                  </div>
                  <div class="todo-item-ddl active">{{ todoItem.ddl }}</div>
                  <div class="h-line active"></div>
                </div>
              </div>
            </div>
            <div id="todo_other">
              <p class="other_title">OTHERS' TO-DO LIST</p>
              <div class="other">
                <div v-for="todoItem in otherTodoList" :key="todoItem" class="todo-item">
                  <div class="todo-item-content">
                    <input :id="'input' + index" type="date" v-model="todoItem.ddl"/>
                    <p>{{ todoItem.content }}</p>
                  </div>
                  <div class="todo-item-ddl">{{ todoItem.ddl }}</div>
                  <div class="h-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="../css/edit.css"></style>

<script>
// import VueMarkdown from 'vue-markdown-render'
import { QuillEditor } from '@vueup/vue-quill'
// import { DatePicker } from 'ant-design-vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css';



export default {
  name: 'EditPage',
  props: {
    msg: String,
  },
  components: {
    // VueMarkdown
    QuillEditor,
    // DatePicker
  },
  data(){
    return {
      tags: ['happy', 'you'],
      addTag: null,
      title: '', 
      content: "",
      // add id
      myTodoList: [{content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"}
      ],
      otherTodoList: [{content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"},
      {content: '联系三位九字班辅导员参加本次活动在活动开头致辞。', ddl: "2024-07-05"}
      ],
      // tags: []
      noteID: this.$route.query.noteID,
      showTranscript: false,
      transcript: '你好'
    }
  },
  created(){

    const params = {
      noteId: this.noteID
    }

    this.$axios.get('/api/notes', {params}).then(response => {
      const responseData = response.data;
      console.log(responseData);
      this.title = responseData.title;
      this.content = responseData.content;
      this.tags = responseData.tag;
      this.transcript = responseData.transcript;
    }).catch(error => {
      window.alert(error);
    });

    this.$axios.get('/api/todo-items', {params}).then(response => {
      const responseData = response.data;
      console.log(responseData);
      this.myTodoList = responseData.self_todo;
      this.otherTodoList = responseData.others_todo;
    }).catch(error => {
      window.alert(error);
    });
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

      const params = {
        note_id: this.noteID,
        content: this.content,
        tag: this.tags,
        title: this.title
      }
      
      this.$axios.post('/api/save-note', params).then(response => {
        const responseData = response.data;
        console.log(responseData);
        window.location.reload();
      }).catch(error => {
        window.alert(error);
      });
    },

    goToPage: function(page_name) {
      this.$router.push(page_name);
    }
  }
}
</script>



