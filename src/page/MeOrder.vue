<template>
  <div class='meorder'>
    <div class='card'>
      <div class='table'>
        <table>
          <thead>
            <th>订单号</th>
            <th>总价</th>

            <th>已付款</th>
            <th>产品信息</th>
            <th>操作</th>

          </thead>
          <tbody>
            <tr v-for='row in list'>
              <td>{{row.oid||'-' }}</td>
              <td>{{row.sum|| 0}}</td>

              <td>{{row._paid ? '是' :'否'}}</td>
              <td>
                <span @click='show_detail(row)' class='anchor'>详情</span>
              </td>

              <td>
                <div class="btn-group" v-if='!row._paid'>
                  <router-link :to="`/pay/${row.oid}`">
                    <button class="btn-small">付款</button>
                  </router-link>
                  <button class="btn-small" @click="cancel(row.id)">取消订单</button>
                </div>
                <div v-else class='btn-group'> <button class="btn-small" @click="cancel(row.id)">删除</button></div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class='model' v-if='detail_visible'>
        <div @click='detail_visible=false' class='mask'></div>
        <div class='card model-content'>
          <h2>{{pet.title}}</h2>
          <div class='cute-form'>
            <span class='key'>价格</span>
            <span class='value'>{{pet.price || '-'}}</span>
          </div>
          <div class='cute-form'>
            <span class='key'>性别</span>
            <span class='value'>{{pet.sex || '-'}}</span>
          </div>
          <div class='cute-form'>
            <span class='key'>品种</span>
            <span class='value'>{{pet.breed_id || '-'}}</span>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
import api from "../lib/api";
import session from "../lib/session";

export default {
  mounted() {
    this.read();
  },
  data() {
    return {
      current: {},
      pet: {},
      list: [],
      detail_visible: false
    };
  },
  methods: {
    show_detail(row) {
      this.current = row;
      this.detail_visible = true;
      this.find_pet(row.product_info);
    },
    find_pet(pet_id) {
      api("pet/find", { id: pet_id }).then(r => {
        this.pet = r.data;
      });
    },
    read() {
      api("order/read", {
        with: "has_one:pet",
        where: { user_id: session.his_id() }
      }).then(r => {
        this.list = r.data;
        console.log(this.list);
      });
    },
    cancel(id) {
      if (!confirm("是否要取消此订单？")) return;

      api("order/delete", { id }).then(r => {
        this.read();
      });
    }
  }
};
</script>

<style scoped>
.meorder{
  background:#fff;
}
.model-content{
  position:fixed;
  background: #fff;
  width:300px;
  top:100px;
  margin-left:0;
  margin-right:0;
  z-index:1;
}
.mask{
  background:rgba(0,0,0,0.6);
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;

}
.card,
table{
	padding:20px 40px;

}
</style>

