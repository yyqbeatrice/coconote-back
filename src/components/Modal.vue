<template>
    <div id="modal-view" :style="backgroundStyle">
        <div id="modal-upload" v-if="status==='uploading'">
            <label for="upload-transcript" style="cursor: pointer;">
                <img src="../assets/upload.svg">
                <span>Import new transcript</span>
            </label>
            <input id="upload-transcript" type="file" style="display: none" @change="onFileChange"
            accept=".txt,.docx,.doc,.md,.tex">
        </div>
        <div id="modal-loading" v-if="status==='loading'">
            <h1>Loading...</h1>
            <img src="https://media.tenor.com/kDEYimynjuYAAAAi/transparent-cat.gif">
        </div>
        <div id="modal-choosing" v-if="status==='choosing'">
            <h1>Choose your identity</h1>
            <div id="modal-choosing-character">
                <div class="modal-choosing-bt" 
                    v-for="character in characters" :key="character"
                    @click="generateNote(character)">
                    {{ character }}
                </div>
            </div>
        </div>
        <img v-if="status==='uploading'" src="../assets/coco4.svg">
    </div>
</template>
  
<style src="../css/modalwindow.css"></style>

<script>
export default {
    name: 'ModalWindow',
    props: {
    },
    data() {
        return {
        //   isModifyTag: false,
            status: 'uploading',
            characters: [],
            title: null
        }
    },
    computed: {
        backgroundStyle(){
            return {
                backgroundColor: this.status === 'choosing' ? '#C3E85A' : 'white'
            }
        }
    },
    methods: {
        onFileChange(event){
            const file = event.target.files[0];
            const formData = {
                'text': file
            };
            let that = this;
            this.$axios.post('/api/upload-transcript', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                // this.responseData = response.data;   
                that.characters = response.data.characters; // [A, B, C]
                that.title = response.data.title
                that.status = 'choosing';
            }).catch(error => {
                window.alert(error);
            });
            this.status = 'loading';
            
        },
        generateNote(character){
            const param = {
                character: character,
                title: this.title
            };
            
            let that = this;
            this.$axios.post('/api/choose-character', param, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response.data);
                window.alert('Note generation complete.');
                that.status = 'uploading';
                window.location.reload();
                // this.responseData = response.data;
            }).catch(error => {
                window.alert(error);
            });
            this.status = 'loading';

        }
    }
};
</script>