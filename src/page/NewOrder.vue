<template>
  <div>
    <Nav />

    <div class='order-form row'>
      <div class='col-lg-4'></div>
      <form @submit.prevent='submit' v-if="(current.pet_id || this.from_cart)&&!submitted">
        <div class='order col-lg-3'>

          <h1>创建订单-{{this.from_cart ? '购物车结算' : pet.title}}</h1>
          <div v-if='current.pet_id'>
            <div class='cute-form'>
              <span class='key'>单价</span>
              <span class='value'>{{pet.price}}</span>
            </div>
            <div class='cute-form'>
              <span class='key'>数量</span>
              <span class='value'>{{this.current.count}}</span>
            </div>
          </div>
          <div v-else>
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
          </div>
          <div class='cute-form'>
            <span class='key'>总价</span>
            <span class='value'>{{total}}</span>
          </div>
          <div class='cute-form'>
            <span class='key'>备注</span>
            <span class='value'>
              <input style='max-width：200px;' type='text' v-model='current.user_memo'>
            </span>
          </div>

          <h4>请选择支付方式</h4>
          <div>
            <div class="row ">
              <img class='col-lg-5' src="../assets/img/wechat.jpg" alt="">
              <span class='col-lg-7 pay'><input type="radio" v-model='current.pay_by' value='wechat'> 微信支付
              </span>

            </div>
            <div class='row  '>
              <img class='col-lg-5' src="../assets/img/alipay.png" alt="">
              <span class='col-lg-7 pay'>
                <input type="radio" v-model='current.pay_by' value='alipay'> 支付宝支付
              </span>

            </div>

          </div>

          <button @click='submit'>提交订单</button>

        </div>
      </form>
      <div class="col-lg-5"></div>

    </div>
  </div>
</template>

<script>
import api from "../lib/api";
import Nav from "../components/Nav";
import session from "../lib/session";
import { generate_oid } from "../lib/order";
import {all,each} from '../hub/cart';


export default {
  components: { Nav },
  mounted() {
    //api('MODEL/FIND',{key:'pet'});
    //api('pet/find',)
    //  api('pet/create',{
    //    title:'asasa',

    //    id:5,
    //    price:7,
    //        })
    console.log(this.$route.query);
    this.current = Object.assign({}, this.current, this.$route.params);
    this.from_cart=this.$route.query.from_cart;
    this.find(this.current.pet_id); //找id
  },
  data() {
    return {
      from_cart:false,
      submitted: false,
      current: {
        pay_by: "wechat"
      },
      pet: {},
      hub:all(),
      // payment_url:null,
      qrcode: null
    };
  },
  computed: {
    checked_cart(){
      let cart=this.hub.cart;
      let checked={};
      each(it=>{
        if(!it._checked)
        return;
        checked[id]=it;

      });
    },
    total() {
      let total=0;
      //计算总价钱
      //if (!this.pet.price) this.pet.price = 0;
      if(this.form_cart){
        each(it=>{
          if(!it._checked)
          return;
          total+=it.$pet.price*it.count;
        });
      }else{
        if(!this.pet.price)
        this.pet.price=0;
        if (!this.current.count);
        this.current.count = 1;

        total=this.pet.price*this.current.count;
      }


      return total;
    }
  },
  methods: {
    find(id) {
      if(!id)
      return;
      api("pet/find", { id }).then(r => {
        this.pet = r.data;
        console.log(this.pet);
      });
    },

    submit() {
      //创建一个订单

      this.current.user_id = session.his_id();

      this.current.sum = this.total;
      this.current.oid = generate_oid(this.pet.id);
      this.current.product_info = this.pet.id || this.hub.cart;
      console.log(this.current);

      api("order/create", this.current).then(r => {
        this.current.id = r.data.id;

        // const c=this.current;
        this.$router.push("/pay/" + r.data.oid);
        console.log("/pay/" + r.data.oid);
        // this.$router.push({path:'/pay',query:{id:r.data.id}})
        // this.pay(this.current.id, c.pay_by,this.total);
        //this.submitted=true;
      });
    }
  }
};
</script>
<style scoped>
h1,
button {
  text-align: center;
}

button {
  padding: 10px 40px;
  margin-left: 70px;
}

.order {
  background: #fff;
}
img {
  width: 100px;
  height: auto;
}

.pay {
  display: inline-block;
  margin-top: 40px;
}
</style>


