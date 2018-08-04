<template>
  <div>
    <div>
      <Nav />
    </div>
    <div class='container'>
      <div class="card">
        <div class="filter row">

          <div class="col-lg-1">分类</div>
          <div class="col-lg-1">品种</div>
          <div class="col-lg-1">毛色</div>
          <div class="col-lg-1">性格</div>
          <div class="col-lg-1">性别</div>
          <div class="col-lg-1">价格</div>
          <div class="col-lg-1">已绝育</div>
          <div class="col-lg-2">已接种疫苗</div>

        </div>
      </div>

    </div>
    <div class='main'>
      <div class="container">
        <div class=' row result'>

          <div class="col-lg-6"><img src="../assets/img/square-1.jpg" alt=""></div>
          <div class="col-lg-6"><img src="../assets/img/square-1.jpg" alt=""></div>
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

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";

export default {
  components: { Nav, Footer }
};
</script>


<style scoped>
.card {
  margin: 20px 0;
}

.filter {
  background-color: rgb(229, 162, 162);
  margin:0;
  text-align: center;
  color:#fff;
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
  background:  rgb(228, 143, 143);
}
</style>
