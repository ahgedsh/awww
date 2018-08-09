
   <template>
  <div>
    <Nav :push-down="true" />
    <div>
      <div class="container ">
        <div class="row">
          <div class="col-lg-3">
            <AdminNav/>
          </div>
          <div class="col-lg-9">
            <div class="content card">
              <h2>分类列表</h2>
              <div class="tool-bar">

                <button @click="show_form=!show_form">创建分类</button>
              </div>
              <div class="error-list">
                <div v-for="e in errors.items" class="error">{{e.msg}}</div>
              </div>

              <form @submit="search($event)">
                <label>搜索</label>
                <input type="search" v-model="keyword" placeholder="搜标题/描述" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
              <form @submit="search_by_username($event)"></form>
            

            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>分类名</label>
                <input name="name" type="text" v-model="current.name" autocomplete="off">

              </div>
              <div class="input-control">
                <label>封面</label>
                <input name="name" type="url" v-model="current.cover_url" autocomplete="off">

              </div>
              <div class="input-control">
                <label>是否推广首页</label>
                <input name="name" type="checkbox" v-model="current.promoring" autocomplete="off">

              </div>
              <div class="input-control">
                <div class="btn-group">
                  <button class="btn-primary" type="submit" :disabled="errors.items.length > 0">提交</button>
                  <button @click="show_form=false" type="button">取消</button>
                </div>
              </div>
            </form>
            <div class="table">
              <table>
                <thead>
                  <th>分类名</th>
                  <th>首页推广</th>
                  <th>操作</th>
                </thead>
                <tbody>
                  <tr v-for="row in list">
                    <td>{{row.name}}</td>
                    <td>{{row.promoring ? "是" :"否"}}</td>
                    <td>
                      <div class="btn-group ">
                        <button class="btn-small" @click="set_current(row)">编辑</button>
                        <button class="btn-small" @click="remove(row.id)">删除</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination :totalCount="total" :limit="limit" :onChange="on_page_change"/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!--<AdminFooter/>-->
  </div>
</template> 	
<script>
/* eslint-disable */
import AdminPage from "../../mixin/AdminPage";
import AdminNav from "../../components/AdminNav";
import Nav from "../../components/Nav";
//import api from "../../lib/api";

export default {
  mounted() {
    this.read();
    this.set_validator_attr({
      name: "分类名"
    });
  },

  components: { Nav, AdminNav },

  data() {
    return {
      model: "category",
      searchable: ["name"]
    };
  },

  methods: {},

  mixins: [AdminPage]
};
</script>
<style scoped>
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
.tool-bar {
  margin-bottom: 15px;
}
</style>

