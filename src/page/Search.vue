<template>
  <div>
    <div>
      <Nav />
    </div>
    <div class="container">
      <form @submit.prevent='search(keyword)'>
        <input v-model='keyword' type="search" placeholder='关键字'>
        <button type="button" hidden>提交</button>
      </form>
    </div>
    <div class='container'>
      <div class="card">
        <div class="filter row">

          <div class="col-lg-2" >
           <!-- <Dropdown api='category.name' @selected="row=>{$set(filter, 'category_id',row.id)}" />  -->
             <Dropdown api="category.name" placeholder="分类"
                    @selected="row => { $set(filter, 'category_id', row.id) }"/>
              
          </div>
          <div class="col-lg-2" >
            <Dropdown api="breed.name" placeholder="品种"
                    @selected="row => { $set(filter, 'breed_id', row.id) }"/>
          </div>
          <div class="col-lg-2" >
            <Dropdown api="color.name" placeholder="毛色"
                    @selected="row => { $set(filter, 'color_id', row.id) }"/>
          </div>
          
          <div class="col" >性格</div>
          <div class="col" >性别</div>
          <div class="col" >价格</div>
          <div class="col" >已绝育</div>
          <div class="col" >已接种疫苗</div>

        </div>
      </div>

    </div>
    <div class='main'>
      <div class="container">
        <!-- <div v-for='it in list' class=' row result'>

          <div class="col-lg-6">{{it.title}}<img src="it.cover_url" class="img-thumbnail" alt=""></div>
          <div class="col-lg-6"><img src="../assets/img/square-1.jpg" class="img-thumbnail" alt=""></div>
        </div> -->
        <div class="row">
          <div v-for='it in list' class="col-lg-3">
            <div class='card'>
              <div class='smallcard'>
                <router-link :to="'/detail/' +it.id">
                  <img :src="it.cover_url" alt="" class="img-thumbnail">
                </router-link>

                <div class="title center">
                  <h5>{{it.title}}</h5>
                </div>
                <div class="desc center">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi non ut nam deserunt,

                </div>
              </div>
            </div>
          </div>

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

import api from "../lib/api";

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import Dropdown from "../components/Dropdown.vue";

export default {
  components: { Nav, Footer, Dropdown },
  data() {
    return {
      list: {},
      keyword: "",
      filter: {}
    };
  },
  mounted() {},

  methods: {
    search(keyword) {
     
      if(!keyword) keyword='';
        let category_query='';
        let breed_query='';
        let color_query='';
      
        let f     = this.filter;
        f.category_id && (category_query = ` and "category_id" = ${f.category_id} `);
        f.breed_id && (breed_query = ` and "breed_id" = ${f.breed_id} `);
        f.color_id && (color_query = ` and "color_id" = ${f.color_id} `);
        let query = `where ( "title" contains "${keyword}" ${category_query} ${breed_query} ${color_query}) `;
        console.log(query);
        
      api("pet/read", {query}).then(r => {
        this.list = r.data;
        console.log(this.list);
      });
    }
  },
  watch:{
    filter:{
      deep:true,
      handler(){
        this.search();
      }
    }
  }
};
</script>


<style scoped>
.card {
  margin: 20px 0;
}

.filter {
  background-color: rgb(229, 162, 162);
  margin: 0;
  text-align: center;
  color: #fff;
}
.filter::after,
.filter::before {
  clear: both;
}

.filter > * {
  padding: 15px;
  font-size: 16px;
}
.filter > *:hover {
  background: rgb(228, 143, 143);
}
</style>
