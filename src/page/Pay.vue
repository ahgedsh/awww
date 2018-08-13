<template>
  <div>
    <Nav />
    <div class='cards'>
      <div class='row'>
      <div class='pay_by' v-if="current.pay_by=='wechat'" >
        
        <div class='chat col-lg-5 col-lg-offset-5'>
          <div class='center'>
           <div v-if="current.pay_by=='wechat'">
            <h3>微信支付</h3> 
            <img :src="qrcode" alt="二维码">           
            <button @click='verify'>支付完成</button>
             </div>                    
          </div>
        </div>
        
        <div>

        </div>
        <div v-if="current.pay_by=='alipay'">
          跳转中，别着急...
        </div>
        

      </div>
      
    </div>
    </div>

  </div>

</template>

<script>
import api from "../lib/api";
import {url} from '../lib/url';
import Nav from '../components/Nav';
import session from '../lib/session';
import {generate_oid} from '../lib/order';

export default {
  components:{Nav},
  data() {
    return {
      current: {
        pay_by: "wechat"
      },
     qrcode:null,
    };
  },
  mounted() {
    this.find(this.$route.params.oid);
    console.log(this.$route.params.oid);

  },
  methods: {
    // findOrder() {
    //   //创建一个订单
    //   api("order/find", { id: this.$route.query.id }).then(r => {
    //     this.current = r.data;
    //     this.pay(this.current.id, this.current.pay_by, this.current.sum);
    //   });
    // },

    find(oid){
      console.log(1);
      api('order/first',{
        where:{oid},
      }).then(r=>{
        let row=this.current=r.data;
        let pay_by=row.pay_by;

        if(!row){
          alert('订单号有误');
          this.go_me_order();

        }
        if(row._paid){
          alert('此订单已支付');
          this.go_me_order();
        }
        this.pay(row.id,pay_by,row.sum);

        this.current=r.data || {};
      })
    },
    go_me_order(){
      this.$router.push('/me/order');
    },

    verify() {
      api("order/find", {
        id: this.current.id
      }).then(r => {
        if (r.data._paid){
          alert("支付成功");
         this.go_me_order();
          
        }
        else {
          alert("支付失败");
        }
      });
    },
    pay(id, pay_by, fee) {
       if (fee > 0.02) fee = 0.02;
     // fee='0.' +fee.toString().slice(0,2);

      return api("order/payment/url", {
        id: id,
        pay_by: pay_by,
        fee: fee,
        return_url:url('/#/me/order'),
      }).then(r => {
        if(r.data.url){
          location.href=r.data.url;
        }else{
          this.qrcode=r.data.qrcode;
        }
      });
    }
  }
};
</script>

<style scoped>
img {
  width: 200px;
  height: auto;
  margin-left: 10px;
}
.chat{
  background:#fff;
  max-width: 250px;
}

</style>


