<template>

  <div class='row'>

    <div class='report-panel txc'>
      <div class='title'>{{title || '检测报告'}}</div>
    </div>
    <div v-if='empty_report()' class='something'>
      <div v-if="(conf=reportStructure[key]) && conf.cat==cat" 
           v-for="(ok,key) in report" 
           :class="(isFullwidth ? 'col-lg-12' : 'col-lg-4') + ' report-item' +(!ok ? 'muted' : '')">

        <span v-if="ok" class="fa fa-check"></span>
        <span v-else class='fa fa-minus'></span>
        {{conf.display_name}}

      </div>
    </div>
    <div v-else class='empty-holder txc' >暂未检测</div>

  </div>
</template>

<script>
export default {
  props:['title','cat','reportStructure','report','isFullwidth'],
  
    methods : {
 	      empty_report () {
 	        if (!this.report)
 	          return false;
 	
 	        return Object.keys(this.report).length;
 	      },
 	    },
    
 
    
  
  
  
};
</script>
<style scoped>
.empty-holder{
  padding:10px;
  margin-bottom: 15px;
 

}

.report-panel,
.empty-holder{
  font-size: 18px;
  border: 1px solid rgba(0,0,0,.5);
  margin-right:10px;
 
 

}
.report-panel{
   padding:15px 0;

  font-weight: bold;

}
.something,
.report-panel{
  margin-right: 10px;
  padding-left:10px;

}

.something{
 line-height: 1.7rem;
 border:1px solid rgba(0,0,0,.5);

 margin-bottom: 20px;
}

</style>


