<template>
    <div id="welcome-page">
        <header>
            <LogoIcon></LogoIcon>
        </header>
        <main>
            <img id="welcome-logo" src="../assets/logo.svg">
            <button id="welcome-button" @click="goToPage('login')">Log in</button>
            <button @click="goToPage('register')">Register</button>
            <button>Change Account</button>
        </main>
    </div>
</template>
  
<style src="../css/welcome.css"></style>

<script>
import LogoIcon from './logo.vue';

export default {
    name: 'WelcomePage',
    components: {
        LogoIcon
    },
    props: {
    },
    data() {
        return {
        //   isModifyTag: false,
        }
    },
    methods: {
        goToPage: function(page_name) {
            this.$router.push(page_name);
        }
    }
};
</script>