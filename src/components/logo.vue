<template>
    <div id="logo-icon" @click="()=>{this.$router.push('/')}" style="cursor: pointer;">
        <img src="../assets/logo.svg">
        <p>Coconote</p>
    </div>
</template>

<style src="../css/logo.css"></style>
<script>

export default {
    name: 'LogoIcon'
}

</script>