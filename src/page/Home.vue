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
      <div class="main center row">

        <!-- <div class="col-sm-3"  v-for='row in list'>
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
        </div> -->
        <div class="col-sm-3 serve">
          <div>
            QUALITY ASSURANCE
          </div>
          <div>
            品质保证
          </div>

        </div>
        <div class="col-sm-3 serve">
          <div>
            BUSINESS INTEGRITY

          </div>
          <div>诚信商家ssggfg</div>

        </div>
        <div class="col-sm-3 serve">
          <div>TRUTHUL DESCRIPTION</div>
          <div>如实描述</div>
        </div>
        <div class="col-sm-3 serve">
          <div>INTENIONS OF SERVICES</div>
          <div>用心服务</div>
        </div>

      </div>

    </div>
    <div class='container'>

    </div>
    <div class="container ">
      <div class=" center head">
         <div class='title'>
            分类推荐
           </div>
        </div>
      <div>
        <div class='row'>
          <div v-for='it in cat' class="col-lg-4 center">
            <div calss='cards'>
              <div class='smallcards'>
                <router-link class='link' :to="'/search?category_id=' +it.id">
                  <img  :src="it.cover_url" alt="yo" class="img-thumbnail">
                  <span class='title'>
                    {{it.name}}</span>
                </router-link>

              </div>

            </div>

          </div>


        </div>
      </div>

      <!-- <div class="col-lg-3 left">
            <router-link :to="'/search?category_id=' +it.id">
              <span class='title'>
              {{it.name}}</span>
            </router-link>

        </div> -->
      <!-- <div  class="col-lg-8 right cat-nav">
          <span v-for='row in it.$breed'>
            <router-link :to="'/search?breed_id=' + row.id">
              {{row.name}}
            </router-link>

          </span>
         
        </div> -->

      <div>
        <!-- <div class="row">
          <div class="col-lg-12">
            <router-link :to="'/detail/' +it.id">
            <img :src="it.cover_url" alt="yo" class="img-thumbnail">
               </router-link>
          </div>
        </div> -->

        <div class=" center head">
         <div class='title'>
           热搜推荐
           
           </div> 
        </div>

        <div class="row">
          <div v-for='pet in list' class="col-lg-3">
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
      list: [],

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
    read_pet() {
      api("pet/read", { limit: 16 }).then(r => {
        this.list = r.data || [];
        console.log(this.list);
      });
    },

    read_hot() {
      api("pet/read", { where: { hot: true } }).then(r => {
        this.hot = r.data;
        //console.log(this.hot);
      });
    },
    read_cat() {
      api("category/read", {
        where: { promoring: true },
        with: { relation: "has_many", model: "breed" }
      }).then(r => {
        this.cat = r.data;
        console.log(this.cat);
        this.read_pet_by_cat();
      });
    },
    read_pet_by_cat() {
      this.cat.forEach(it => {
        api("pet/read", { where: { category_id: it.id }, limit: 8 }).then(r => {
          this.$set(it, "pet_list", r.data);
          //  console.log(r.data);
        });
      });
    }
  }
};
</script>



<style scoped>
.link{
  text-decoration:none;
 
  
}
.smallcards {
  background: rgb(229, 162, 162);
  margin-top: 20px;
}


.card,
.cards {
  margin: 10px 0;
}
.smallcards{
  
  margin-bottom:10px;
}
.head .title:last-child{
  margin:10px 0;
}

.head .title:first-child{
  margin:0px;
}

.smallcards .title{
  font-size:17px;
  color:#fff;
  text-decoration: none;
}
.card:hover {
  background: #fff;
}
.smallcard {
  padding: 10px;
}
.smallcards {
  padding: 20px;
 
}

.head {
  padding: 15px 0;
  
}

.head .title {
  font-size: 20px;
  color: rgb(229, 162, 162);
}

.head .cat-nav a {
  font-size: 22px;
 
  margin-top: 5px;
  text-decoration: none;
}

.head {
  
}
.head .title,
.head .cat-nav a,
.main {
  color: rgb(229, 162, 162);
}
.main {
  padding: 20px 0;
  border: 2px dotted rosybrown;
  border-left: 0;
  border-right: 0;
  margin:20px 0;
}
.serve{
  border-left:1px solid  rgb(229, 162, 162);;
  padding:20px 0;
}
.serve:first-child{
  border:0;
}
</style>


