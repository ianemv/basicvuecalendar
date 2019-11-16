export default {
    state:{
       
        sidebarToggled:true

    },
    mutations:{
    
          toggleSidebar (state, payload) {
              state.sidebarToggled = payload
            }
    },
    getters:{
        
         sidebarStatus (state) {
            return state.sidebarToggled
          }
    },
    actions:{
        login(context) {
            context.commit("login");
        },
    },

}