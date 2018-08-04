<template>
  <div class='toolbar-container'>
    <div class="toolbar">
      <div @click='show_cart=!show_cart' class='item'>购物车</div>
      <router-link to='/'>
      <div class='item link'>回到首页</div>
      </router-link>
      <router-link to='/search'>
      <div class='item link'>搜索</div>
      </router-link>
    </div>
    <div v-if='show_cart' class="cart">
      <div class="title center item"> 我的购物车{{count}}</div>
      <div class="contenter">
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
            <img src="../assets/img/square-1.jpg" alt="">
          </div>
          <div class="col-lg-4">
            <div class="pet-title">{{it.$pet.title}}</div>
            <div class="price">单价:￥{{it.$pet && it.$pet.price}}</div>
            <div class="price">小计:{{it.$pet && it.$pet.price*it.count}}</div>
          </div>
          <div class="col-lg-3">
            <div class="btn-group">
              <button type='button' @click='it.count>1 && it.count--'>-</button>
              <input type="text" v-model='it.count'>
              <button type='button' @click='it.count++'>+</button>

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
        
    </div>

    </div>
  
  </div>
</template>

<script>
import {all,hub,remove,count} from '../hub/cart';



export default{
  data(){
    return{
      show_cart:false,
      hub:all(),
      checked_all:false,
    }
  },
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
.item.link:hover{
  text-decoration:none;
 
  
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

