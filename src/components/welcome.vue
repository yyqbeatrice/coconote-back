<template>
    <div id="welcome-page">
        <header>
            <div id="welcome-icon">
                <img src="../assets/logo.svg">
                <p>Coconote</p>
            </div>
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
export default {
    name: 'WelcomePage',
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