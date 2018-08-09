import Vue from "vue";

export default Vue.directive('outer-click-hide',{
  inserted:function(el){
    el.addEventListener('click',e=>{
      window.scrollTo(0,0);
    });
  }
})