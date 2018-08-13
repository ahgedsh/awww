<template>
  <div class="header">
    <div class="container">
      <div class='row'>
        <div class="nav">

          <div class="col-lg-4 " >
            <span v-for='row in list'>
              <router-link  :to="'/search?category_id='+row.id" class='item'>{{row.name}}</router-link>
            </span>
          </div>
          <div class="col-lg-4 center">
           <form @submit.prevent="$router.push({path:'/search',query:{keyword}})" 
                 v-if='visible_search'>
           <input type="search" v-model='keyword'
                  @blur="visible_search=false"
                  placeholder='发现萌物'>
           
           
           </form>
            <div v-else>
             <router-link to='/' class='item logo'>AWEEE</router-link>
               <img class='icon'  @click='visible_search=true'
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQeSURBVGhD7VhJaBRBFI0L7uJ2U/Emogh6EE9qvEREUdxxwYt4EA8eophghIC4HjxEVIgJpqvaiaYPiYJHIaggLrigIiQqkpnMBMkhmN1s4/vl6yHExJie7k5G8qCo7lfV//9Xv6qrurPGMY4xiHrbXlavVC5KVVzrGtStqJNScN1Yr/Ur1KW4P/TVcebwsbGBZGHhRAjYF1fquRt0/4LAuwfj0b8dbXcatF5JU6OHqGWtRVBv3OAQWAtqJ6HUYcnOR8eZwq5Z38rK5rJ/HsozZKfXPIMa5Va0pGQ+u4aHZDI5AUEXpEZbqQSujyPYaewyLGK2vRjPFKdsaB2FnXVsDh5Jx5kEp5YZTaX6MJqXvjvOLDaPGMjecth5QjGdMcvaw6bgYDKhtaaI1oTWu9mUFmQKyvSi3R5My+1sCgZx2z5jnGndJvOdtG+A7XOu/cBeAhK4GS1MJ78yMRCScQi5RzEfa4uKprLJH8grFsbfGgdKXSAdCOLFxTNEhPjC4s8n7Q9geD9HqQEpn0k6MMSU2mKEaN3k68aJLLxkNo6RChzIRjV95pJKD/J6ZDaafZ+zfwF87hC/EPSOVHqAgFPGIHZsUqFA1gpEtItv2TxJeweE3OfIHCQVGuDzgfiWNUrKO2Cs1hjD2YlUaICAs2YQtT5PyjtgpEOMJaurJ5MKDXL4NEKUUqS8gRuUjEgHqVCBjGwT/6grSXmHMYQdnbehAhnZRSGalHfAUJMYaywtnU0qNOBsd1R8o1wl5R3IxmsxhtFZQyo0wPcV8Y36JCnvwEK77ZuxEQJT6pX4xj6ykZR3uG8OGH1KKhTgtL0Ig9eH0tL/k9kz5FsaQjohpLeuvHwh6cABnydkAGVTJJU+YOyuMar1DVKBIlpRMR0+Y/SZQzp9xLReJWmG0a5YJLKUdGCAiHwRAZ8vSfkHd9GjrvZlzg6BhG2vwDRuNgNnWZtI+wcYXgARcYq5SdpXmPWo1Gf6uE7af2CDWg8HP5n2AjnCsCltiAhk4rERoXWNrBM2BQMIOQgRPUaM1pGR/JQbCjKdYO8LRZgjEWzvZXNwwNzdCYfmVAxh7xJab2bTiGDeTlrnIfAfrgi3gOsORUx9WdlqOPqUcq7UI9xv+5cpIZsdnpF9Isqg+/D8Qwk+Ze833x3Kn0f5hocz+QecGlGIacN9lfmZZ9sHcLzYKhkEdwTlMvq8QC2vcjfYDwnL2iD2JAO4Hx0xgrpIZB6cnsaovu8fxF+KnBTkEzpn4AtjMDEoXaGJcQExS+R8hmAuIigbpRLX5aivSZbQlj3c9JOgx4QYPyBBS/ADxQT1uzZQ/P9isClnpBgJelAx+KZnl8yBEcPj0biYsQQJeggx2eySOfhDDI5H8tObzZkFc3AVMZkswoVMp4wXMY7MQlbWL9kwfo/jTQ74AAAAAElFTkSuQmCC">

            </div>

          </div>
          <div class="col-lg-4 right">
              <router-link to='/admin/pet' class='item'>管理面板</router-link>
            <span v-if='session.logged_in()'>
              <router-link to='/me/order' class='item'>{{session.uinfo().username || '不愿透露姓名的网友'}}</router-link>
              <span class='item logout' @click="session.logout('/#/login')">登出</span>

            </span>

            <span v-else>
              <router-link to='/login' class='item'>登录</router-link>
              <router-link to='/signup' class='item'>注册</router-link>

            </span>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import session from '../lib/session';
import api from '../lib/api';

export default{
  data(){
    return{
      session,
      visible_search:false,
      keyword:null,
      list:{},
    }
  },
  mounted(){
    this.read_cat();

  },
  methods:{
    read_cat(){
      api('category/read',{limit:4})
         .then(r=>{
           this.list=r.data || [];

         })
    }
  }
 
}

</script>


<style scoped>
.header {
  margin: 20px 0;
}

.logo {
  font-size: 40px;
  font-weight: bold;
}

.nav .icon{
  width:30px;
  display: inline-block;
 
  margin-top:-10px;
  margin-bottom:0px;
  cursor: pointer;
  
}

.nav a,
.logout{
  font-size: 22px;
  margin: 10px;
  color: rgb(229, 162, 162);
  text-decoration: none;
}
.nav .logo {
  
  font-size: 30px;
}

.nav  {

}
</style>

