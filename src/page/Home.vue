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
        <div class="col-sm-4">
          <div class='card'>
            <div class='smallcard'>

              <img src="../assets/img/square-1.jpg" alt="" class="img-thumbnail">

              <div class="title center">
                <h5>二狗子和喵喵</h5>
              </div>
              <div class="desc center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi non ut nam deserunt,

              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class='card'>
            <div class='smallcard'>
               
              <img src="../assets/img/square-1.jpg" alt="" class="img-thumbnail">

              <div class="title center">
                <h5>二狗子和喵喵</h5>
              </div>
              <div class="desc center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio nisi non ut nam deserunt,

              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class='card'>
            <div class='smallcard'>

              <img src="../assets/img/square-1.jpg" alt="" class="img-thumbnail">

              <div class="title center">
                <h5>二狗子和喵喵</h5>
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
          <span class='title'>{{it.name}}</span>

        </div>
        <div  class="col-lg-8 right cat-nav">
          <span v-for='row in it.$breed'>
          <a href="#">
            {{row.name}}</a>

          </span>
          <!-- <a href="#">沙皮</a>
          <a href="#">拉布拉多</a>
          <a href="#">吉娃娃</a>
          <a href="#">牛头</a>
          <a href="#">博美</a>
          <a href="#">柴犬</a>
          <a href="#">金毛</a> -->
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
                <img :src="pet.cover_url" alt="" class="img-thumbnail">
               </router-link>

                <div class="title center">
                  <h5>{{pet.title}}</h5>
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
    //this.read_breed();
    
  },

  methods: {
   
   
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
        api("pet/read", { where: { category_id: it.id }, limit: 16 }).then(
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
  margin-top: 0;
  border: 2px solid rgb(229, 162, 162);
}
.card:hover {
  background: #fff;
}
.smallcard {
  padding: 15px;
}
.title {
  color: rgb(229, 162, 162);
  font-weight: bold;
  margin-top:-10px;
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


