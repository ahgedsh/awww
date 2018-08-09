import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Validator from 'vee-validate'
import VueAwesomeSwiper from 'vue-awesome-swiper';

import 'swiper/dist/css/swiper.css';

import jQuery from "jquery";
window.$ = window.jQuery = jQuery; 
import './../node_modules/bootstrap/dist/css/bootstrap.css'

import Home from './page/Home.vue'
import Search from './page/Search.vue'
import Detail from './page/Detail.vue'
import NewOrder from './page/NewOrder.vue'
import Pay from './page/Pay.vue'
import Login from './page/Login.vue'
import Signup from './page/Signup.vue'
import Me from './page/Me.vue'
import MeOrder from './page/MeOrder.vue'
import MeSetting from './page/MeSetting.vue'




import Admin from './page/admin/Admin.vue'
import Category from './page/admin/Category.vue'
import Breed from './page/admin/Breed.vue'
import User from './page/admin/User.vue'
import Order from './page/admin/Order.vue'
import Pet from './page/admin/Pet.vue'

import session  from './lib/session';


Vue.use(Router)

Vue.use(Validator,{
  locale:'zh_CN'
});
Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false

 const router = new Router({
  routes: [
    { path: '/', component: Home,meta : { title : '首页 - AWWW' } },
    { path: '/detail/:id', component: Detail,meta : { title : '详情 -AWWW ' } },
    { path: '/Search', component: Search,meta : { title : '搜索 - AWWW' }},
    { path: '/new_order/:pet_id?', component: NewOrder,meta : { title : '订单 - AWWW' } },
    { path: '/pay/:oid', component: Pay,meta : { title : '支付 - AWWW' } },
    { path: '/Login', component: Login,meta : { title : '登录 - AWWW' } },
    { path: '/Signup', component: Signup,meta : { title : '注册 - AWWW' } },
    {
      path:'/me',
      component:Me,
      children:[
        {
          path:'order',
      component:MeOrder,
      meta : { title : '我的订单 - AWWW' }


    },
    {
      path:'setting',
  component:MeSetting,
  meta : { title : '我的设置 - AWWW' }
}
  ]
    },
    
    
    
    {
      path: '/admin',
      component: Admin,
      children  : [
        {
          path      : 'category',
          component : Category,
          meta : { title : '分类管理 - AWWW' }
        },
        {
          path      : 'breed',
          component : Breed,
          meta : { title : '品种管理 - AWWW' }
        },
        {
          path      : 'user',
          component : User,
          meta : { title : '用户管理 - AWWW' }
        },
        {
          path      : 'order',
          component : Order,
          meta : { title : '订单管理 - AWWW' }
        },
        {
          path      : 'pet',
          component : Pet,
          meta : { title : '宠物管理- AWWW' }
        },
      ],
    },
  ],
});


router.beforeEach((to,from,next)=>{
  let go_admin=to.fullPath.startsWith('/admin/');

  let go_publish=to.fullPath.startsWith('/publish');

  if(go_publish && !session.logged_in()){
    alert('请先登录，如果没有账号请先注册；管理员账号如下，用户名：admin，密码：yoyoyo');
    next('/login');
    return;

  }

  if(go_admin && !session.is_admin()){
    alert('请先使用管理员账号登录，用户名：admin,密码：yoyoyo')
    next('/login');
    return;
  }else{
    next();
    document.title = to.meta.title;
  }
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
