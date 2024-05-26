<template>
    <div id="login-page">
        <header>
            <LogoIcon></LogoIcon>
        </header>
        <main>
            <div class="login-item">
                <span>Username</span>
                <input type="text" v-model="username">
            </div>
            <div class="login-item">
                <span>Password</span>
                <input type="password" v-model="password">
            </div>
            <button @click="login">login</button>
        </main>
    </div>
</template>
  
<style src="../css/loginpage.css"></style>

<script>
import CryptoJS from 'crypto-js';
import LogoIcon from './logo.vue';

export default {
    name: 'LoginPage',
    components: {
        LogoIcon,
    },
    props: {

    },
    data() {
        return {
            username: null,
            password: null
        }
    },
    methods: {
        login() {
            console.log('login');
            const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

            const params = {
                username: this.username,
                password: hashedPassword
            }
            console.log(params)
            this.$axios.post('/api/login', params).then(response => {
                const data = response.data
                console.log(data);
                const userID = data.user_id;
                this.$store.dispatch('login', userID);
                window.alert('Login Succeed!');
                this.$router.push('/content');
            }).catch(error => {
                window.alert(error);
            });
        },
    },

};
</script>