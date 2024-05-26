<template>
    <div id="register-page">
        <header>
            <LogoIcon></LogoIcon>
        </header>
        <main>
            <div class="register-item">
                <span>Username</span>
                <input type="text" v-model="username">
            </div>
            <div class="register-item">
                <span>Password</span>
                <input type="password" v-model="password">
            </div>
            <div id="register-upload">
                <label for="file-input" style="cursor: pointer;">
                    <span>Upload Avatar</span>
                    <img v-if="!avatarUrl" src="../assets/upload.svg">
                    <img v-if="avatarUrl" :src="avatarUrl" style="width: 25px; height: 25px">
                </label>
                <input id="file-input" type="file" @change="onFileChange" style="display: none;">
            </div>
            <button @click="register">Register</button>
        </main>
    </div>
</template>
  
<style src="../css/registerpage.css"></style>

<script>
import CryptoJS from 'crypto-js';
import LogoIcon from './logo.vue';

export default {
    name: 'RegisterPage',
    components: {
        LogoIcon
    },
    props: {
    },
    data() {
        return {
            username: null,
            password: null,
            avatar: null, // 用于存储选中的文件
            avatarUrl: null // 用于存储头像的缩略图 URL
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.avatar = file;

                // 使用 FileReader 读取文件并生成缩略图
                const reader = new FileReader();
                reader.onload = (e) => {
                this.avatarUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        register() {
            console.log('register clicked')
            const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

            const formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', hashedPassword);
            formData.append('avatar', this.avatar); // 添加文件到 FormData

            console.log('FormData:', formData);

            this.$axios.post('/api/register', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                this.responseData = response.data;
                window.alert('Register succeed!');
                this.$router.push('/login')
            }).catch(error => {
                window.alert(error);
            });
        }
    },

};
</script>