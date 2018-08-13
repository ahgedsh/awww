<template>
  <div class='toolbar-container'>
    <div   class="toolbar">
      <div  @click='show_cart=!show_cart' id='cart-trigger' class='item'>
        <span v-if='show_full'>购物车</span>
        <span v-else><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
     width="30" height="30"
     viewBox="0 0 30 30"
     style="fill:#ffffff;">    <path d="M 2 2 A 1.0001 1.0001 0 1 0 2 4 L 3.8789062 4 C 4.1048086 4 4.2933102 4.1414634 4.3574219 4.359375 L 8.6191406 18.847656 C 8.993174 20.11937 10.169409 21 11.496094 21 L 22.472656 21 C 23.821072 21 25.011657 20.088693 25.367188 18.789062 L 27.964844 9.2636719 A 1.0001 1.0001 0 0 0 27 8 L 7.5136719 8 L 6.2773438 3.7949219 A 1.0001 1.0001 0 0 0 6.2753906 3.7949219 C 5.9634991 2.7348335 4.9830041 2 3.8789062 2 L 2 2 z M 12 23 A 2 2 0 0 0 10 25 A 2 2 0 0 0 12 27 A 2 2 0 0 0 14 25 A 2 2 0 0 0 12 23 z M 22 23 A 2 2 0 0 0 20 25 A 2 2 0 0 0 22 27 A 2 2 0 0 0 24 25 A 2 2 0 0 0 22 23 z"></path></svg></span>
      </div>
      <div class='item' v-top>
        <span v-if='show_full'>回到顶部</span>
        <span v-else><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="30" height="30"
                      viewBox="0 0 252 252"
                      style="fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,252v-252h252v252z" fill="none"></path><g id="Layer_1" fill="#ffffff"><g><path d="M13.6395,179.55l112.3605,-118.2762l112.3605,118.2762z"></path><path d="M126,65.8476l105.0273,110.5524h-210.0546l105.0273,-110.5524M126,56.7l-119.7,126h239.4l-119.7,-126z"></path></g></g></g></svg></span>
      </div>
      <router-link to='/search' class='link'>
      <div class='item'>
        <span v-if='show_full'>搜索</span>
        <span v-else><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="30" height="30"
                      viewBox="0 0 24 24"
                      style="fill:#ffffff;">    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path></svg></span>
      </div>
      </router-link>
    </div>
    <div v-show='show_cart' class="cart" ref='cart' except='#cart-trigger'>
      <div class="title center item"> 我的购物车{{count()}}</div>
      <div class="contenter" v-if='count()'>
        <div class="shortcart">
          <div class="item">
            <input @click='toggle_all' v-model='checked_all' type="checkbox">全选
          </div>
        </div>
        <div v-for='(it,key) in hub.cart' class='item row'>
          <div class="col-lg-1">
            <input type="checkbox" v-model='it._checked'>
          </div>
          <div class="col-lg-2">
          
            <img :src="it.$pet && it.$pet.cover_url" alt="">
          </div>
          <div class="col-lg-4">
            <div class="pet-title">{{it.$pet.title}}</div>
            <div class="price">单价:￥{{it.$pet && it.$pet.price}}</div>
            <div class="price">小计:{{it.$pet && it.$pet.price*it.count}}</div>
          </div>
          <div class="col-lg-3" style='padding:0px;'>
            <div class="btn-group">
              <button style='border-right:0px;' class='col-sm-3' type='button' @click='it.count>1 && it.count--'>-</button>
              <input  class='col-sm-6' type="text" v-model='it.count'>
              <button style='border-left:0px;' class='col-sm-3' type='button' @click='it.count++'>+</button>

            </div>
          </div>
          <div class="col-lg-2">
            <button @click='remove(it.id)'>删除</button>
          </div>
        </div>
        <div class=" item foot">
          <div>共计：{{sum}}</div>
         <button>付款</button>
        </div>
     
      </div>
      <div v-else class='center empty-holder'>暂无内容</div>
        
    </div>

    </div>
  
  </div>
</template>

<script>
import {all,hub,remove,count} from '../hub/cart';
import top from '../directive/top.js';



export default{
  directives:{top},
  data(){
    return{
      show_cart:false,
      hub:all(),
      checked_all:false,
      show_full:false,
    }
  },
  // mounted(){
  //   document.addEventListener('click',e=>{
  //     let el=this.$refs.cart;
       

  //     let except_selector=el.getAttribute('except');
  //     let except=document.querySelectorAll(except_selector);
      

  //     for(let it of except)
  //        if (it===e.target)
  //        return;

  //        if(el.contains(e.target))
  //        return;

  //        this.show_cart=false;
  //   });

  // },
  
  methods:{
    count,
    remove,
    toggle_all(){
      let cart=this.hub.cart;
      for (let id in this.hub.cart){
      let it=cart[id];
      this.$set(it,'_checked',!this.checked_all);

      }

    }
  },
  computed:{
    sum(){
      let cart=this.hub.cart;
      let sum=0;
      for( let id in this.hub.cart){
        let it=cart[id];

        if(!it._checked)
        continue;
        
        sum+=it.count*it.$pet.price;
      }
      return sum;

    }
  }

}

</script>
<style scoped>

.empty-holder{
  color:#fff;
}
.toolbar-container {
  position: fixed;
  top: 40%;
  right: 0;
 
  z-index: 1;
}
.link,
.toolbar-container{
 color: #fff;
}


.toolbar-container,
.cart {
  background: rgb(229, 162, 162);
}
.toolbar-container .item {
  padding: 7px 15px;
  cursor: pointer;
}
.cart {
  position: absolute;
  top: 0;
  width: 600px;
  left: -600px;
}
button,
input[type='text']{
  border:1px solid #fff;
}
input[type='text']{
  background:rgb(229, 162, 162);
}
.btn-group button:last-child{
  margin-left:0;
}
.cart .contenter{
    overflow: auto;
 	  max-height: 350px;
}
.row{
  margin-left:0px;
  margin-right:0px;
}
</style>

