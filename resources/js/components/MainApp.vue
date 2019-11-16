<template >
     <div class="wrapper">
        <Header/>
        <main id="main" role="main" class="container-fluid">
            <div id="content" class="container-fluid">
                    <router-view ></router-view>
            </div>
        </main>
    </div>
</template>

<script>

    import Sidebar from './layouts/Sidebar.vue'
    import Header from './layouts/Header.vue';

    export default {
        components: {Sidebar,Header},
        name: 'main-app'
    }
</script>

<style scoped>
  #main{
        padding-top:80px;
    }
</style>
