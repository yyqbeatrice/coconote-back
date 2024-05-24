<template>
    <div id="register-page">
        <header>
            <div id="register-icon">
                <img src="../assets/logo.svg">
                <p>Coconote</p>
            </div>
        </header>
        <main>
            <div class="register-item">
                <span>Username</span>
                <input type="text">
            </div>
            <div class="register-item">
                <span>Password</span>
                <input type="password">
            </div>
            <div id="register-upload">
                <span>Upload Avatar</span>
                <img src="../assets/upload.svg">
            </div>
            <button>Register</button>
        </main>
    </div>
</template>
  
<style src="../css/registerpage.css"></style>

<script>
export default {
    name: 'RegisterPage',
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