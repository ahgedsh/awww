<template>
  <div>
    <Nav />
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="card side-nav">
            <router-link to='/me/order' class='nav-item'relative>我的订单</router-link>
            <router-link to='/me/setting' class='nav-item'relative>设置</router-link>
          </div>
        </div>
        <div class="col-lg-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>

import '../css/sidebar.css';
import Nav from '../components/Nav';
// import AdminFooter from '../components/AdminFooter';
//import api from '../lib/api';
//import session from '../lib/session';
export default {
  components:{Nav},
  data(){
    return {

    }
  }
  
}
</script>
<style scoped>

.side-nav {
	background: #fff;
	margin-left: -15px;
}

.nav-item {
  color: #555;
  display: block;
  padding: 10px 20px;
}

.nav-item.active,
.nav-item.router-link-active,
.nav-item:hover {
	color: rgb(231, 160, 160);
		text-decoration: none;
}


.nav-item:hover {
	background:rgb(231, 160, 160);
	color:#fff;
	
}
</style>


