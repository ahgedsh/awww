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
            <h2>品种列表</h2>
            <div class='tool-bar'>
              <button @click='show_form=!show_form'>创建品种</button>
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

            <form v-if='show_form' @submit='cou($event)'>
              <div class="input-control">
                <label>品种名</label>
                <input type="text"   autocomplete="off" v-model="current.name">

              </div>

              <div class="input-control">
                <label>分类</label>
                <Dropdown :list='category_list' :onSelect='set_category_id' />
              </div>

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
                  <th>品种</th>
                  <th>分类</th>

                  <th>操作</th>

                </thead>
                <tbody>
                  <tr :key='row.username' v-for='row in list'>
                    <td>{{row.name}}</td>
                    <td>{{row.$category ? row.$category.name :'-'}}</td>

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
import Dropdown from "../../components/Dropdown";
import AdminPage from "../../mixin/AdminPage";
import AdminNav from "../../components/AdminNav";
import Nav from "../../components/Nav";
import api from "../../lib/api";

export default {
  mounted() {
    this.read_category();
    this.set_validator_attr({
      name: "分类名"
    });
  },
  components: { Dropdown },

  data() {
    return {
      category_list: [],

      model: "breed",
      searchable: ["name"],

      with: [{ model: "category", relation: "has_one" }]
    };
  },

  methods: {
    read_category() {
      api("category/read").then(r => {
        this.category_list = r.data;      
      });
    },

    set_category_id(row) {
      this.$set(this.current, "category_id", row.id);
    }
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

