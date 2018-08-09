<template>
  <div>
    <div>
      <Nav />
    </div>
    <div class="container">
      <form @submit.prevent='search(keyword)'>
        <input v-model='keyword' type="search" placeholder='发现萌物'>
        <button type="button" hidden>提交</button>
      </form>
    </div>
    <div class='container'>
      <div class="card">
        <div class="filter row">

          <div class="col-lg-2" >
            <label >分类</label>
           <!-- <Dropdown api='category.name' @selected="row=>{$set(filter, 'category_id',row.id)}" />  -->
             <Dropdown api="category.name"
                    @selected="row => { $set(filter, 'category_id', row.id) }"/>
              
          </div>
          <div class="col-lg-2" >
            <label > 品种</label>
            <Dropdown api="breed.name" 
                    @selected="row => { $set(filter, 'breed_id', row.id) }"/>
          </div>
          <div class="col-lg-2" >
            <label>毛色</label>
            <Dropdown api="color.name" 
                    @selected="row => { $set(filter, 'color_id', row.id) }"/>
          </div>
          <div class="col-lg-2">
             <label>性格</label>
            <Dropdown api="character.name" 
                    @selected="row => { $set(filter, 'character_id', row.id) }"/>
          </div>
          
            
          
          

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
                  <img :src="it.cover_url ? it.cover_url :'http://wx3.sinaimg.cn/large/006qLr31ly1fu236blfpgj30be06omxh.jpg'" alt="" class="img-thumbnail">
                </router-link>

                <div class="title center">
                  <h4>{{it.title}}</h4>
                  <h5>￥{{it.price}}</h5>
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
    <div  class='center'>
      <Pagination style='margin-left:0;' :limit='limit' :totalCount='total' @pageChange='on_page_change' />
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
import Pagination from "../components/Pagination.vue";


export default {
  components: { Nav, Footer, Dropdown,Pagination },
  data() {
    return {
      list: {},
      keyword: "",
      total:0,
      limit:8,
      current_page:1,
      filter: {breed_id:'',
               category_id:''},

    };
  },
  mounted() {
   
    this.keyword = this.$route.query.keyword;
    this.filter.breed_id = this.$route.query.breed_id;
    this.filter.category_id = this.$route.query.category_id;
    
    //console.log(this.filter);
    this.search()
  },

  methods: {
    search(keyword=this.keyword) {

    
     
      if(!keyword) keyword='';
       
        let category_query='';
        let breed_query='';
        let color_query='';
        let character_query='';  
        let f     = this.filter;

        f.category_id && (category_query = ` and "category_id" = ${f.category_id} `);
        f.breed_id && (breed_query = ` and "breed_id" = ${f.breed_id} `);
        f.color_id && (color_query = ` and "color_id" = ${f.color_id} `);
        f.character_id && (character_query = ` and "character_id" = ${f.character_id} `);
        let query = `where ( "title" contains "${keyword}" ${category_query} ${breed_query} ${color_query} ${character_query} ) `;
       // console.log(query);
        
      api("pet/read", {query, page : this.current_page,limit:this.limit}).then(r => {
        this.list = r.data;
        this.total=r.total;
        console.log(this.total);
      });
    },
    on_page_change(page){
      console.log('page:',page);
      this.current_page=page;
      this.search();
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
  margin: 10px 0;
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

</style>
