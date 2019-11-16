<template>
    <div>
    <div class="card mb-3" >
        <div class="card-header">Event Calendar</div>
            <div class="card-body">
                <div class="row" >
                    <div class="col-md-4">
                        <EventForm/>
                    </div>

                    <div class="col-md-8">
                        <Calendar :events="events"/>
                    </div>
                </div>
        </div>
    </div>
    </div>
</template>

<script>


//import our database functionalities from our model

import { getEvents, addEvent } from './EventModel'

import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

import Calendar from '../../helper/Calendar'
import EventForm from './Form'


export default {
    mixins: [validationMixin],
    components: {
        Calendar,
        EventForm
    },
    data(){
        return {
            events:[],
            error:[],
            meta: null,
            links: {
                    first: null,
                    last: null,
                    next: null,
                    prev: null,
                },
            show:false,
            form:{
                title:'',
                description:'',
                status:0

            },
            statusFilter:'all',
            loading:true,
            limit:10,
            error:false,
            submitted:false,
            options: [
                { value: 5, text: '5' },
                { value: 10, text: '10' },
                { value: 15, text: '15' },
                { value: 20, text: '20' },
                { value: 50, text: '50' }
                ]
        }
    },
    beforeRouteEnter (to, from, next) {

        let limit = to.query.limit || 10 ;

        var response = getEvents();

        response.then(function(response){
            next(vm=>  vm.setData(response.data));
        }).catch(function(err){
            console.log(err);
        });


    },
    beforeRouteUpdate (to, from, next) {

        this.events = [];
        this.links = this.meta = null
        var vm = this;
        let limit = to.query.limit ? to.query.limit : this.limit ? this.limit : 10;
        this.limit = limit;

        var response = getEvents();
            response.then(function(response){
                vm.setData(response.data);
                next();
        }).catch(function(err){
            console.log(err);
        });
    },
    created(){
        this.$eventHub.$on('update-list', this.fetchData);
    },
    beforeDestroy(){
        this.$eventHub.$off('update-list');
    },
    methods:{
            fetchData(){
                // use to fetch data
                var response = getEvents(this.meta.current_page || 1, this.limit);
                let vm = this;
                response.then(function(response){
                      vm.setData(response.data);
                }).catch(function(err){
                    console.log(err);
                });
            },
            setData({data,links,meta}) {
                this.events = data;
                this.links = links;
                this.meta = meta;
                this.loading = false;
            },
             goToNext() {

                let limit = this.$route.query.limit || this.limit;

                this.loading = true;

                this.$router.push({
                    name: 'home',
                    query: {
                        page: this.nextPage,
                        limit: limit,
                    },
                });
            },
            goToPrev() {

                let limit = this.$route.query.limit || this.limit;

                this.loading = true;

                this.$router.push({
                    name: 'home',
                    query: {
                        page: this.prevPage,
                        limit: limit,
                    }
                });
            },
            updateLimit() {

                let limit = this.limit;

                this.loading = true;

                this.$router.push({
                    name: 'home',
                    query: {
                        page: this.meta != null ? this.meta.current_page || 1 : 1,
                        limit: limit,
                    }
                });
            },

    },
    computed: {
            nextPage() {
                if (! this.meta || this.meta.current_page === this.meta.last_page) {
                    return;
                }

                return this.meta.current_page + 1;
            },
            prevPage() {
                if (! this.meta || this.meta.current_page === 1) {
                    return;
                }

                return this.meta.current_page - 1;
            },
            paginatonCount() {
                if (! this.meta) {
                    return;
                }

                const { current_page, last_page } = this.meta;

                return `${current_page} of ${last_page}`;
            },



        },
        watch:{
            limit:{
                handler:'updateLimit',
                immediate:true
            }
        },
         validations: {
            form: {
                title: {
                    required,
                    minLength: minLength(3)
                }
            }
            },
}
</script>

<style>
    .list-group-item {
        cursor: pointer;
    }
    .completed {
        text-decoration: line-through;
    }
    .btn:focus {
        box-shadow: none !important;
    }


</style>
