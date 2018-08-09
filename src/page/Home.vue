<template>

  <div class='home'>
    <div>
      <Nav />

    </div>
    <div class="container">
      <div class="silder">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(it,index) in hot" :key='index'>

            <router-link :to="'/detail/'+it.id">
              <img :src="it.cover_url" :alt="it.title" class="img-thumbnail">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot='pagination'></div>

        </swiper>

      </div>
    </div>
    <div class="container">
      <div class="main row">

        <div class="col-sm-3"  v-for='row in list'>
          <div class='card'>
            <div class='smallcard'>
                <router-link :to="'/detail/'+row.id">               
                  <img :src="row.cover_url ? row.cover_url :'http://wx3.sinaimg.cn/large/006qLr31ly1fu236blfpgj30be06omxh.jpg'" alt="" class="img-thumbnail">
                </router-link>
              <div class="title center">
                <h4>{{row.title}}</h4>
                <h5>￥{{row.price}}</h5>
              </div>
              <div class="desc center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi non ut nam deserunt,

              </div>
            </div>
          </div>
        </div>
      
      </div>

    </div>
    <div class="container ">
     <div v-for='it in cat'>
        <div  class="head row">
        <div class="col-lg-4 left">
            <router-link :to="'/search?category_id=' +it.id">
              <span class='title'>
              {{it.name}}</span>
            </router-link>

        </div>
        <div  class="col-lg-8 right cat-nav">
          <span v-for='row in it.$breed'>
            <router-link :to="'/search?breed_id=' + row.id">
              {{row.name}}
            </router-link>

          </span>
         
        </div>
      </div>
      <div class="body">
        <div class="row">
          <div class="col-lg-12">
            <router-link :to="'/detail/' +it.id">
            <img :src="it.cover_url" alt="yo" class="img-thumbnail">
               </router-link>
          </div>
        </div>
        <div class="row">
          <div v-for='pet in it.pet_list' class="col-lg-3">
            <div class='card'>
              <div class='smallcard'>
              <router-link :to="'/detail/' +pet.id">
                <img :src="pet.cover_url ? pet.cover_url :'http://wx3.sinaimg.cn/large/006qLr31ly1fu236blfpgj30be06omxh.jpg'" alt="" class="img-thumbnail">
               </router-link>

                <div class="title center">
                  <h4>{{pet.title}}</h4>
                  <h5>￥{{pet.price}}</h5>
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

    </div>
   
    
    <Footer />
  </div>
</template>

<script>
/* eslint-disable */
import "../css/global.css";
import api from "../lib/api";

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

export default {
  components: { Nav, Footer },
  data() {
    return {
      hot: [],
      cat: [],
      list:[],
    
     
      swiperOption: {
        keyboard: true,
        clickable: false,
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperSlides: [1, 2, 3, 4, 5]
    };
  },

  mounted() {
    this.read_hot();
    this.read_cat();
    this.read_pet();
    //this.read_breed();
    
  },

  methods: {
    read_pet(){
      api('pet/read',{limit:4})
         .then(r=>{
           this.list=r.data || [];
           console.log(this.list);

         })
    },
   
   
    read_hot() {
      api("pet/read", { where: { hot: true } }).then(r => {
        this.hot = r.data;
        //console.log(this.hot);
      });
    },
    read_cat() {
      api("category/read",{ where: { promoring: true },with:{relation:'has_many',model:'breed'}}).then(r => {
        this.cat = r.data;
        console.log(this.cat);
        this.read_pet_by_cat();
      });
    },
    read_pet_by_cat() {
      this.cat.forEach(it => {
        api("pet/read", { where: { category_id: it.id }, limit: 8 }).then(
          r => {
            this.$set(it, "pet_list", r.data);
          //  console.log(r.data);
          }
        );
      });
    }
  }
};
</script>



<style scoped>
.silder img {
  width: 100%;
}
.card {
 
  border: 2px solid rgb(229, 162, 162);
 margin:10px 0;
  
}
.card:hover {
  background: #fff;
}
.smallcard {
  padding: 15px;

}


.head {
  padding: 15px 0;

  margin: 20px 0;
}

.head .title {
  font-size: 20px;
  color: rgb(229, 162, 162);
}

.head .cat-nav a {
  font-size: 17px;
  padding: 5px 10px;
  margin-top: 5px;
  text-decoration: none;
}

.head {
  border: 3px solid rosybrown;
}
.head .title,
.head .cat-nav a {
  color: rgb(229, 162, 162);
}
</style>


