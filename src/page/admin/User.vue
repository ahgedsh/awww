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
            <h2>用户列表</h2>
            <div class='tool-bar'>
              <button @click='show_form=!show_form'>创建用户</button>
            </div>
            <div class="error-list">
                  <div v-for="e in errors.items" class="error">{{e.msg}}</div>
                </div>
            <form @submit='search($event)'>
              <div class='input-control'>
                <label>搜索</label>
                <input type="search" v-model="keyword" placeholder='搜用户名/手机/邮箱' autofocus>
              </div>
              <button type='submit' hidden>搜</button>
            </form>

            <form v-if='show_form' @submit='cou($event)'>
              <div class="input-control">
                <label>用户名</label>
                <input type="text"   autocomplete="off" v-model="current.username">
                 
              </div>
              
               <div class="input-control">
                <label>电话</label>
                <input type="string"  v-model="current.phone">
                
              </div>
              <div class="input-control">
                <label>邮箱</label>
                <input type="text"  v-model="current.email">
              
              </div>
              <div class="input-control">
                <label>密码</label>
                <input type="password"  v-model="current.password">
                
              </div>
              
              
              <!-- <div class="input-control">
                <label>所属位置</label>
                <Location :onSelect="set_location_id"/>
              </div> -->

              <div class="input-control">
                <div class='btn-group'>
                  <button class="btn-primary" type="submit">提交</button>
                  <button type="button" @click='show_form=false'>取消</button>
                </div>

              </div>
            </form>
            <div class='table'>
              <table>
                <thead>
                  <th>用户名</th>
                  <th>电话</th>
                  <th>邮箱</th>
                 
                  <th>收货地址</th>
                  <th>操作</th>

                </thead>
                <tbody>
                  <tr v-for='row in list'>
                    <td>{{row.username}}</td>
                    <td>{{row.phone || '-'}}</td>
                    <td>{{row.email || '-'}}</td>
                    <td></td>

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

import AdminPage from "../../mixin/AdminPage.vue";
//import Dropdown from "../../components/Dropdown";
import AdminNav from "../../components/AdminNav";
//import Location  from "../../components/Location";
import Nav from "../../components/Nav";
//import api from "../../lib/api";


export default {
 // components: {Location},
 mounted() {
    this.read();
    this.set_validator_attr({
      name: "用户名"
    });
  },

  
  data() {
    return {
     
      model: "user",
      searchable: ["username", "phone", "email"]
    };
  },

  methods:{
    //  set_location_id (row) {
    //     this.$set(this.current, 'location_id', row.id);
    //   },
  },
  mixins: [AdminPage]
};
</script>

<style scoped>
.input-control > *,
search {
  display: block;
  padding-bottom: 5px;
  padding-top: 10px;
}
.dib {
  display: inline-block;
  width: 3%;
}
input {
  outline: 0;
  width: 100%;
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

table {
  width: 100%;
  border-collapse: collapse;
}

.tool-bar{
  margin-bottom:-10px;
}
</style>

