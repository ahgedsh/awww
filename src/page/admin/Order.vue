<template>
  <div>
    <Nav />
    <div class='container '>
      <div class="row">
        <div class='col-lg-3'>
          <AdminNav />
        </div>
        <div class='col-lg-9'>
          <div class='content card'>
            <h2>订单列表</h2>
            <div class='tool-bar'>
              <button @click='show_form=!show_form'>创建订单</button>
            </div>
            <div class="error-list">
              <div v-for="e in errors.items" class="error">{{e.msg}}</div>
            </div>
            <form @submit='search($event)'>
              <div class='input-control'>

                <label>搜索</label>
                <input type="search" v-model="keyword" placeholder='搜关键字' autofocus>
              </div>
              <button type='submit' hidden>搜</button>
            </form>

          
            <div class='table'>
              <table>
                <thead>
                  <th>订单号</th>
                  <th>总价</th>
                 
                  <th>备注</th>
                  <th>产品信息</th>
                  <th>已付款</th>
                  <th>操作</th>

                </thead>
                <tbody>
                  <tr  v-for='row in list'>
                    <td>{{row.oid||'-' }}</td>
                    <td>{{row.sum|| 0}}</td>                   
                    <td>{{row.momo ||'-'}}</td>
                    <td>{{row.product_info}}</td>
                    <td>{{row._paid ? '是' :'否'}}</td>


                    <td>
                      <div class="btn-group">
                        <button class="btn-small" @click="set_current(row)">编辑</button>
                        <button class="btn-small" @click="remove(row.id)">删除</button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <Pagination :totalCount="total" :limit="limit" :onChange="on_page_change" />
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

 <script>
//import Dropdown from "../../components/Dropdown";
import AdminPage from "../../mixin/AdminPage";
//import AdminNav from "../../components/AdminNav";
//import Nav from "../../components/Nav";
import api from "../../lib/api";

export default {
  mounted() {
    // this.read_user();
    // this.set_validator_attr({
    //   name: "订单名"
    // });
  },
 // components: { Dropdown },

  data() {
    return {
     user_list: [],

      model: "order",
      searchable: ["oid"],

     // with: [{ model: "user", type: "has_one" }]
    };
  },

  methods: {
    // read_user() {
    //   api("user/read").then(r => {
    //     this.user_list = r.data;
    //     console.log(this.user_list)

    //   });
    // },
   
    // set_user_id(row) {
    //   this.$set(this.current, "user_id", row.id);
    // },
  },
  mixins: [AdminPage]
};
</script>

<style scoped>
.dib {
  display: inline-block;
  width: 3%;
}
input {
  outline: 0;
  width: 100%;
}
input[type=radio]{
  width:auto;
 
}

h2 {
  margin-top: 0;
  font-size: 16px;
}

.table {
  overflow: auto;
}

th,
td {
  padding: 5px 10px;
  text-align: left;
}
</style>

