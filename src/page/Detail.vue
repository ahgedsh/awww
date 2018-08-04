<template>
    <div>
        <div>
            <Nav />
        </div>
        <div class="container">
    <div class="silder">
      <div>
        <img src="../assets/img/silder.jpg" alt="yo">

      </div>
      <div class="mask "></div>
      
      <div class="info">

          <div class="prop-list">
              <div class="prop">
                <span>产地</span>
                <span>何家营</span>
              </div>
              <div class="prop">
                <span>品种</span>
                <span>沙皮</span>
              </div>
              <div class="prop">
                <span>产地</span>
                <span>何家营</span>
              </div>
              <div class="prop">
                <span>品种</span>
                <span>沙皮</span>
              </div>
              <div class="prop">
                <span>产地</span>
                <span>何家营</span>
              </div>
              <div class="prop">
                <span>品种</span>
                <span>沙皮</span>
              </div>
              <div class="prop">
                <span>产地</span>
                <span>何家营</span>
              </div>
              <div class="prop">
                <span>品种</span>
                <span>沙皮</span>
              </div>

            </div>
              <h1>你瞅啥</h1>
    
              
      
          </div>
         
          <router-link :to="`/new_order/${current.id}`" :class="`btn-primary btn-large buy ${current.id ? '':'disabled'}`">￥2000 购买</router-link>
           <button v-if='!pet_exist' @click='add_to_cart(current.id,1)'  class="btn-primary btn-large carts">加入购物车</button>
           <button v-else class="btn-primary btn-large other-carts"  disabled>已加入购物车</button>

   
    </div>


    
  </div>

  <div class="container">
    <div class="main">
      <div class="row center other-info" >
        <div class="col-lg-2">4个月</div>
        <div class="col-lg-2">已打疫苗</div>
        <div class="col-lg-2">无遗传病</div>
        <div class="col-lg-2">已绝育</div>
        <div class="col-lg-2">拉布拉多纯种</div>
      </div>
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur consequuntur dolorem doloremque
        dolorum enim explicabo labore maiores nesciunt nihil pariatur, reprehenderit? Esse magnam nulla quas. Laudantium
        rerum veritatis voluptatum!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur consequuntur dolorem doloremque
        dolorum enim explicabo labore maiores nesciunt nihil pariatur, reprehenderit? Esse magnam nulla quas. Laudantium
        rerum veritatis voluptatum!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur consequuntur dolorem doloremque
        dolorum enim explicabo labore maiores nesciunt nihil pariatur, reprehenderit? Esse magnam nulla quas. Laudantium
        rerum veritatis voluptatum!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur consequuntur dolorem doloremque
        dolorum enim explicabo labore maiores nesciunt nihil pariatur, reprehenderit? Esse magnam nulla quas. Laudantium
        rerum veritatis voluptatum!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam consectetur consequuntur dolorem doloremque
        dolorum enim explicabo labore maiores nesciunt nihil pariatur, reprehenderit? Esse magnam nulla quas. Laudantium
        rerum veritatis voluptatum!
      </div>
    </div>
  </div>

        <div>
            <Footer />
        </div>

    </div>
</template>

<script>
/* eslint-disable */
import "../css/global.css";
import api from '../lib/api'
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import {hub,add,all,pet_exist} from '../hub/cart';

export default {
  components: { Nav, Footer },
  mounted(){
    this.find();
  },
  data(){
    return {
      pet_exist:false,
      current:{},
      hidden:false,
      hub,
    }
  },
  methods:{
    all,
    add_to_cart:add,
    find(){
      let id=this.$route.params.id;
      api('pet/find',{id:id})
         .then(r=>{
           this.current=r.data;
         })
    }
  },
  watch:{
    hub :{
      deep:true,
      handler(n,o){
        if(this.current){
          this.pet_exist=pet_exist(this.current.id);
        }
      }

    }
  }
};
</script>



<style scoped>
.silder img {
  width: 100%;
}

.header {
  margin-top: 20px;
}

.logo {
  font-size: 40px;
  font-weight: bold;
}
.nav {
  padding: 10px 0;
  margin: 0;
}

.nav a {
  font-size: 20px;
  margin: 10px;
  color: rgb(229, 162, 162);
  text-decoration: none;
}
.nav .logo a {
  font-size: 25px;
}
.nav,
.head {
  border: 3px solid rosybrown;
}
.head .title,

.head .cat-nav a {
  color: rgb(229, 162, 162);
}

h1 {
  font-size: 60px;
  font-weight: 900;
}

.silder:hover .mask,
.silder:hover .info {
  opacity: 1;
}

.silder {
  position: relative;
}

.mask {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
}
.info {
  opacity: 0;
  padding: 30px;
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  width: 50%;
  line-height: 2.5rem;
  font-style: 1.3rem;
}
.buy {
  bottom: 60px;
  right: 20px;
  position: absolute;
}
.carts{
  padding-left:30px;
}
.carts,
.other-carts {
 
  bottom: 10px;
  right: 20px;
  position: absolute;
  border:none;
}
.other-carts{
  right:14px;
}
.buy:hover,
.carts:hover
{
  text-decoration: none;
}

.prop > *:first-child {
  opacity: 0.7;
  margin-right: 10px;
}

.content,
.other-info {
  border: 3px solid rosybrown;
}
.other-info {
  padding: 10px;
  margin: 0;
  margin-top: 10px;
  font-size: 19px;
  font-weight: bold;
  color: rgb(229, 162, 162);
  border-bottom: none;
}
.other-info > * {
  margin-left: 15px;
}

.content {
  padding: 10px;
  margin-bottom: 20px;
  line-height: 2rem;
}

.disabled{
  pointer-events: none;
  opacity: 0.7;
}
</style>

