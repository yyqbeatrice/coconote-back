<template>
    <div id="login-page">
        <header>
            <div id="login-icon">
                <img src="../assets/logo.svg">
                <p>Coconote</p>
            </div>
        </header>
        <main>
            <div class="login-item">
                <span>Username</span>
                <input type="text">
            </div>
            <div class="login-item">
                <span>Password</span>
                <input type="password">
            </div>
            <button>login</button>
        </main>
    </div>
</template>
  
<style src="../css/loginpage.css"></style>

<script>
export default {
    name: 'LoginPage',
    props: {
    },
    data() {
        return {
        //   isModifyTag: false,
        }
    },
    methods: {

    },

};
</script>