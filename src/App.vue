<template>
    <div id="app">
    <router-view></router-view> 
    <ToolBar /> 
   
   <!-- <dropdown :onSelect="tmp" :list="[
   {name:'whh',id:1},
   {name:'lbb',id:2},
   {name:'lsd',id:3},
   ]"/> -->
   </div> 
</template>

<script>
import ToolBar from './components/ToolBar';


export default {
  name: 'app',
  components: {
    ToolBar,
  
    
  },

 
};
 
  
</script>

<style>

</style>

