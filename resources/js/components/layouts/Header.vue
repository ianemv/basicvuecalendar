<template>
    <div>
          <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Event App</a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">

              <li class="nav-item" v-bind:class="isActive('/')">
                 <router-link to="/" class="nav-link"> <i class="fas fa-clipboard-list"></i> Events</router-link>
              </li>
              <li class="nav-item" v-bind:class="isActive('/')">
                 <router-link to="/other" class="nav-link"> <i class="fas fa-clipboard-list"></i> Other Page</router-link>
              </li>


        </ul>

      </div>
    </nav>
    </div>
</template>

<script>
export default {
 methods: {


            isActive(route){
                this.$route.path.indexOf(route) > -1 ? 'active' : '';
            }
        },
        computed: {
             showSidebar(){
                return this.$store.getters.sidebarStatus ? '' : 'active';
            },
            sidebarStatus(){
                return this.$store.getters.sidebarStatus;

            },
            activeRoute(){
               // return this.$
            }

        }
}
</script>

<style>

</style>
