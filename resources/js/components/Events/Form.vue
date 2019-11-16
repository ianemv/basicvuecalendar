<template>
 <div class="d-md-block" id="sidebar" >
     <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Event</label>
    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Event title" v-model="form.eventTitle">

  </div>

  <div class="row">
    <div class="col">

      <datepicker v-model="form.fromDate" name="startdate"  input-class="form-control"></datepicker>
    </div>
    <div class="col">
      <datepicker v-model="form.toDate" name="enddate" input-class="form-control"></datepicker>
    </div>
  </div>

<div class="row">
    <div class="col">
        <div class="form-check form-check-inline" v-for="week in weekdays" :key="week.id">
            <input class="form-check-input" type="checkbox" :id="'inlineCheckbox'+week.id" :value="week.day" v-model="form.weekdays">
            <label class="form-check-label" for="'inlineCheckbox'+week.id">{{week.display}}</label>
        </div>
    </div>
    <notifications group="foo" />
</div>

<div class="row">
    <div class="col">
    <button type="submit" class="btn btn-primary" @click="submitPost">Save</button>
    </div>
</div>
</form>

</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { addEvent } from '../Events/EventModel'

import {mixin} from '../../../mixins/index'

const dateFormat = 'YYYY-MM-DD';

const weekdaysData = [
    {day: 'Mon', display: 'Mon', id: 'day_1'},
    {day: 'Tue', display: 'Tue', id: 'day_2'},
    {day: 'Wed', display: 'Wed', id: 'day_3'},
    {day: 'Thu', display: 'Thu', id: 'day_4'},
    {day: 'Fri', display: 'Fri', id: 'day_5'},
    {day: 'Sat', display: 'Sat', id: 'day_6'},
    {day: 'Sun', display: 'Sun', id: 'day_7'},
];

export default {
    mixins: [mixin],
    components:{
        Datepicker
    },
    props: {
        weekdays: {
            type: Array,
            default: () => weekdaysData
        }
    },
    data(){
        return {
            form:{
                fromDate: '',
                toDate: '',
                eventTitle:'',
                weekdays:[]
            }
        }
    },
    name: 'sidebar',
    created(){
        this.notification.group = 'foo';
    },
    methods: {
        submitPost(e){

            e.preventDefault();

            if (!this.validateForm()) return;

            let postData = {
                events: this.composePostData(),
                from_date: this.moment(this.form.fromDate).format(dateFormat),
                end_date: this.moment(this.form.toDate).format(dateFormat),
            };

            let resp = addEvent(postData);
            let vm = this;
            resp.then(function(response){
                vm.$eventHub.$emit('update-list');
            })
            .catch(function(error){
                console.log(error);
            });
        },
        validateForm(){
            this.notification.title = "Important message";

            if ( this.form.eventTitle == '' ){
                this.notification.text = "Please input title";
                this.notifyApp();
                return false;
            }

            if ( (this.form.fromDate == '' || this.form.toDate =='' ) ){
                this.notification.text = "Please input valid dates.";
                this.notifyApp();
                return false;
            }

            if (this.moment(this.form.fromDate) > this.moment(this.form.toDate)){
                this.notification.text = "Start date should be earlier than end date.";
                this.notifyApp();
                return;
            }

            if ( this.form.weekdays.length == 0 ){
                this.notification.text = "Please select weekdays";
                this.notifyApp();
                return false;
            }

            return true;
        },
        composePostData(){
            const startOfMonth = this.moment(this.form.fromDate);
            const endOfMonth   = this.moment(this.form.toDate);
            let day = startOfMonth.clone();
            let arr = [];

            while ( day <= endOfMonth ){

                if (this.form.weekdays.indexOf(day.format('ddd')) > -1 ){
                    event = {
                        event_date : day.format('YYYY-MM-DD'),
                        title : this.form.eventTitle
                    }
                    arr.push(event);
                }
                day.add(1, 'days');
            }
            return arr;
        },
        resetForm(){
         this.form = {
                fromDate: '',
                toDate: '',
                eventTitle:'',
                weekdays:[]
            };
        }
    }
};

</script>

<style>
    .form-check-inline {
        margin-right: 0.75rem !important;
    }

</style>
