<template>
    <div id="detail-page">
        <header>
        </header>
        <main>
        </main>
    </div>
</template>
  
<style src="../css/detail.css"></style>

<script>
export default {
    name: 'DetailPage',
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