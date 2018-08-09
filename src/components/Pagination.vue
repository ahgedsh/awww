<template>
  <div class="pagination">
    <span class='btn-group'>
      <button class='btn-small'
              @click='change(1)'
              :disabled='is_first_page'
              >First</button>
      <button class='btn-small'
             :disabled='is_first_page'

             
              @click='prev()'>Prev</button>
    </span>
      &nbsp;
    <span class='btn-group'>
      <button class='btn-small '
       style='margin:5px'
      :key='page'
      v-if='Math.abs(page-current_page)<=half_limit || half_limit<1'
      @click='change(page)'
      :class="{active:current_page==page}"
      v-for='page in last_page'>{{page}}
      
     

      </button>
        &nbsp;
      
    </span>
    <span class='btn-group'>
      <button class='btn-small'
                
              @click='next()'
              :disabled='is_last_page'>Next</button>
      <button class='btn-small'
              :disabled='is_last_page'
              @click="change(last_page)">Last</button>
      
    </span>
  </div>

</template>

   <script>
    /* eslint-disable */
export default{
 
  methods:{
    change(page){
      if(this.onChange)
      this.onChange(page);
      this.$emit('pageChange',page);

      this.current_page=page;

    },
    next(){
                                                        
      if(this.is_last_page)
      return;

      this.change(++this.current_page);
    },

    prev(){
    if(this.is_first_page)
    return;

    this.change(--this.current_page);
    

   }
  },

   props : {
      limit      : {
        default : 0,
      },
      totalCount : {
        default : 0,
      },
    
      onChange   : {
        default () {
          //console.log(1);
        },
      },
    },

    data () {
      return {
        current_page : 1,
      };
    },

   
  computed:{
    half_limit(){
      return Math.floor(this.limit/2);
    },

    is_last_page(){
      return this.current_page==this.last_page;
    },

    is_first_page(){
      return this.current_page==1;
    },

    last_page(){
      return Math.ceil(this.totalCount/this.limit);
    }
  }
  
}


</script>
<style scoped>

.pagination{
  margin-left:230px;
}
.pagination button{
  background: #fff;
  border:1px solid rgb(229, 162, 162);
  
}
button.active{
  background:rgb(229, 162, 162);
  color:#fff;
}


</style>

