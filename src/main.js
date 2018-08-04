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


Vue.use(Router)

Vue.use(Validator,{
  locale:'zh_CN'
});
Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false

 const router = new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/detail/:id', component: Detail },
    { path: '/Search', component: Search },
    { path: '/new_order/:pet_id?', component: NewOrder },
    { path: '/pay/:oid', component: Pay },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup },
    {
      path:'/me',
      component:Me,
      children:[
        {
          path:'order',
      component:MeOrder,
    },
    {
      path:'setting',
  component:MeSetting,
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
        },
        {
          path      : 'breed',
          component : Breed,
        },
        {
          path      : 'user',
          component : User,
        },
        {
          path      : 'order',
          component : Order,
        },
        {
          path      : 'pet',
          component : Pet,
        },
      ],
    },
  ],
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
