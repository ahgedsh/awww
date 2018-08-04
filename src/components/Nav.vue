<template>
  <div class="header">
    <div class="container">
      <div class='row'>
        <div class="nav">

          <div class="col-lg-5 ">
            <router-link to='/search' class='item'>Item</router-link>
            <router-link to='/search' class='item'>Item</router-link>
            <router-link to='/search' class='item'>Item</router-link>
            <router-link to='/admin/pet' class='item'>管理面板</router-link>
          </div>
          <div class="col-lg-2">
            <!-- <a href="#" class="item logo">AWEEE</a> -->
            <router-link to='/' class='item logo'>AWEEE</router-link>

          </div>
          <div class="col-lg-5 right">
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

export default{
  data(){
    return{
      session,
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
.nav {
  padding: 15px 0;
  margin-left: 0px;
  margin-right: 0px;
}

.nav a,
.logout{
  font-size: 20px;
  margin: 10px;
  color: rgb(229, 162, 162);
  text-decoration: none;
}
.nav .logo a {
  font-size: 25px;
}

.nav {
  border: 3px solid rosybrown;
}
</style>

