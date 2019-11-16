<template>
    <div>
        <h2>{{ displayMonth }} </h2>
        <table class="table">
            <tbody>
                <tr v-for="day in days" :key="day.date.format('D')+day.date.format('M')+day.date.format('Y')"
                 v-bind:class="[day.event.title == null ? '' : 'withitem']"
                >
                    <td>{{ formatDisplayDate(day.date) }}
                        <strong>{{ day.event.title }} </strong>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import moment from 'moment'

    export default {
        props:{
            month:{
                type: Date,
                default: () => moment().toDate()
            },
            year:{
                type: Date,
                default: () => moment().toDate()
            },
            events:{
                type: Array,
                default: []
            },
        },
        data(){
            return {
                currentMonth:{},
                days:[],
                activeMonth: this.moment(),
                activeYear: this.moment()
            }
        },
        created(){
            this.currentMonth = this.moment(this.month);
        },
        mounted(){
           this.setMonthDates();
        },
        methods:{
            nextMonth(){
                this.activeMonth.add(1,'M');
                // this.handleNextMonth();
            },
            previousMonth(){
                // this.previousMonthCallback();
            },
            updateDays(){
                const days = this.days.map((d) => {
                   let evt = this.events.filter ((e) => { return this.moment(e.event_date).format('YYYY-MM-DD') == this.moment(d.date).format('YYYY-MM-DD') });
                    return evt.length === 0 ?  {...d, event:{} } : {...d, event: evt[0]}
                })
                this.days = days;
            },
            setMonthDates(){
                const startOfMonth = this.moment(this.month).startOf('month');
                const endOfMonth   = this.moment(this.month).endOf('month');
                let day = startOfMonth.clone();
                while ( day <= endOfMonth ){
                    this.days.push({date: day.clone(), event:{} } );
                     day.add(1, 'days');
                }
            },
            formatDisplayDate(d){
                return  d.format('D') + " " + d.format('ddd')
            }
        },
        computed: {
            displayMonth: function() {
                return this.moment(this.currentMonth).format("MMMM");
            }
        },
        watch:{
            events:{
                handler: 'updateDays',
                immediate: true
            }
        }

    }
</script>

<style lang="scss" scoped>
    .withitem {
        background: #0B8043;
        color:#fff;
    }
    .form-check-inline {
        margin-right: 0.75rem !important;
    }
</style>
