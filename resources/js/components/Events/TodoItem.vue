<template>
                <b-list-group-item v-bind:key="form.id">
                    <div  class="float-left" > 
                    <div v-if="!editing" class="float-left" v-bind:class="[ form.status == 1 ? ' completed' : '' ]" > 
                        
                        

                        <label class="todo-container"> <p  @click="selectTodo">{{form.title}} </p>
                            <input type="checkbox" v-model="form.status" @change="updateStatus"  true-value="1"  false-value="0">
                             <span class="checkmark"></span>
                        </label>
                      
                    </div>
                     <b-form inline v-if="editing"  @submit="onSubmit">
                        
                        <b-form-input
                        id="input-1"
                        v-model="form.title"
                        type="text"
                        required
                        placeholder="Task title"
                        @blur="doneEditing"
                        ></b-form-input>                    
                        
                        <!-- <b-button variant="primary" @click="onSubmit"><i class="fa fa-check"></i></b-button>
                        <b-button variant="primary" @click="show=false"><i class="fa fa-times"></i></b-button> -->

                    </b-form>
                    </div>
                   <div class="float-right" v-if="!editing">
                     
                        
                          <b-button class="btn-sm" @click="confirmDelete = !confirmDelete"><i class="fa fa-times"></i></b-button>

                        <b-modal v-model="confirmDelete" @ok="onDelete"  ref="modal">Are you sure you want to delete this item?</b-modal>
                   </div>

                </b-list-group-item>     
</template>

<script>

// import our function delete and udpate

import { updateTodo, deleteTodo } from './TodoModel'

export default {
     props: ['todo'],
     data(){
         return {
             editing:false,
             form:{
                 title:'',
                 description:'',
                 status:''
             },
             beforeEditTitle:'',
             confirmDelete: false
         }
     },
     mounted(){
          this.form = Object.assign({}, this.todo);
     },

     methods:{
         updateTodo(){          
             var vm = this;   
             var response  = updateTodo(this.form);
                  response.then(function(response){
                       vm.afterSubmit(response.data);
                 })
                 .catch(function(error){
                     console.log(error);
                 });
         },
         onSubmit(evt){
           //  this.form = Object.assign({}, this.todo);
             evt.preventDefault();
             this.updateTodo();

         },
         updateStatus(e){

             this.form.status = e.currentTarget.checked ? 1 : 0;
             this.updateTodo();

         },
       
         doneEditing(evt){

             evt.preventDefault();
             

            // restore the title if user removed the title 

            if (this.form.title.trim() === '') {
                this.form.title = this.beforeEditTitle
            }

            // we only update todo when has changes

            if (this.form.title.trim() === this.beforeEditTitle){
                this.form.title = this.beforeEditTitle;
            }else{
                this.updateTodo();
            }

             this.editing = false;
         },
         afterSubmit(data){
            this.form = data;
            this.editing = false;
             this.$eventHub.$emit('update-list');
             
         },
         selectTodo(){
             this.editing = true;   
             this.beforeEditTitle = this.form.title;         
         },
       
          onReset(){
                this.form.title = '';
                this.form.description = '';
                 this.show = false;
            },
            onDelete(bvModalEvt){
                 bvModalEvt.preventDefault();

                 var response = deleteTodo(this.form.id);                 
                 var vm = this;

                 response.then(function(response){
                       vm.afterDelete();                       
                 })
                 .catch(function(error){
                     console.log(error);
                 });
            },
            afterDelete(){
                this.$eventHub.$emit('update-list');
                this.$nextTick(() => {
                   this.$refs.modal.hide()
                });
            }
     }

}
</script>

<style>
 .completed {
        text-decoration: line-through;
    }

.todo-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.todo-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 5px;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.todo-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.todo-container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.todo-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.todo-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

</style>