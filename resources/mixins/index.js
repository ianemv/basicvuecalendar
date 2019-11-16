
import Vue from 'vue';

export const mixin = {
    data(){
        return {
            notification: {
                group:'',
                title:'',
                type:'warn',
                text:''
            },
        }
    },
    methods: {
        notifyApp(){
            this.$notify({
                group: this.notification.group,
                type: this.notification.type,
                title: this.notification.title,
                text: this.notification.text
            });
        }
    },
    template: `<notifications group="foo" />`
  }


export const ComponentWithNotification = Vue.extend({
    mixins: [mixin]
})
