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
            <h2>宠物列表</h2>
            <div class='tool-bar'>
              <button @click='show_form=!show_form'>创建宠物</button>
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
                <label>宠物名</label>
                <input type="text"  autocomplete="off" v-model="current.title">
              </div>
              <div class="input-control">
                <label>价格</label>
                <input type="text" autocomplete="off" v-model="current.price">
              </div>
              <!-- <div class="input-control">
                <label>颜色</label>
                <input type="text"  autocomplete="off" v-model="current.color">
              </div>
              <div class="input-control">
                <label>产地</label>
                <input type="text" autocomplete="off" v-model="current.origin">
              </div>
              
              
              <div class="input-control">
                <label>性格</label>
                <input type="text" autocomplete="off" v-model="current.character">
              </div>
              <div class="input-control">
                <label>生日</label>
                <input type="date"  autocomplete="off" v-model="current.birthday">
              </div> -->
               <div class="input-control">
                <label>封面地址</label>
                <input type="url"  autocomplete="off" v-model="current.cover_url">
              </div>
             
            
              <div class="input-control">
                <label>分类</label>
                <Dropdown :list='category_list' :onSelect='set_category_id' />
              </div>
              <div class="input-control">
                <label>品种</label>
                <Dropdown :list='breed_list' :onSelect='set_breed_id' />
              </div>
              
                <div class="input-control">
                  <label>接种疫苗
                  <input class="dib " type="checkbox" v-model="current.character">
                  </label>
                </div>
                <div class="input-control">
                  <label>轮播推广
                  <input class="dib " type="checkbox" v-model="current.hot">
                  </label>
                </div>
                <div class="input-control">
                  <label>遗传病
                  <input class="dib " type="checkbox" v-model="current.disease">
                  </label>
                </div>
                <div class="input-control">
                  <label>纯种
                  <input class="dib " type="checkbox" v-model="current.pure_breed">
                  </label>
                </div>
                <div class="input-control">
                  <label>已绝育
                  <input class="dib " type="checkbox" v-model="current.neuter">
                  </label>
                </div>

                <div class="input-control">
                  <label>性别
                  男<input class="dib " type="checkbox" v-model="current.sex"> 女
                  <input class="dib " type="checkbox" v-model="current.sex">
                  </label>
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
                  <th>宠物名</th>
                  
                  <!-- <th>颜色</th>
                  <th>产地</th>
                  
                  <th>性格</th>
                  <th>生日</th> -->
                  <th>价格</th>
                  <th>分类</th>
                  <th>品种</th>

                  <th>操作</th>

                </thead>
                <tbody>
                  <tr :key='row.username' v-for='row in list'>
                    <td>
                      <router-link v-if='row.title'   :to="'/new_order?pet_id=' + row.id">
                        {{row.title}}
                      </router-link>
                      <span v-else>-</span>
                    </td>
                    
                    <td>{{row.price}}</td>

                    <td>{{row.$category && row.$category.name ||'-'}}</td>
                    <td>{{row.$category && row.$category.name ||'-'}}</td>

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
    this.read_breed();
    this.set_validator_attr({
      name: "品种名"
    });
  },
  components: { Dropdown },

  data() {
    return {
      current: {
        preview: []
      },
      category_list: [],
      breed_list: [],

      model: "pet",
      searchable: ["name"],

      with: [{ model: "category", relation: "has_one" }],
      with: [{ model: "breed", relation: "has_one" }]
    };
  },

  methods: {
    read_category() {
      api("category/read").then(r => {
        this.category_list = r.data;
        console.log(this.category_list);
      });
    },
    read_breed() {
      api("breed/read").then(r => {
        this.breed_list = r.data;
      });
    },
    set_category_id(row) {
      console.log(row.id);
      this.$set(this.current, "category_id", row.id);
    },
    set_breed_id(row) {
      this.$set(this.current, "breed_id", row.id);
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

input[type='url']{
  margin:15px 0;
}

.splice{
  padding: 10px;
  margin-bottom:15px;
}
</style>

