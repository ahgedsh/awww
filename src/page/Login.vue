<template>
  <div>
    <Nav/>
    <div class='header'>
      <div class='container'>
        <form @submit='submit' class="main-form" autocomplete="off">
          <h1 class='center'>登录</h1>
          <div class='error-list'>
            <div v-if='login_failed' class='error-list'> 
              <div class='error'> 用户名或者密码有误</div>
            </div>
          </div>

          <div class='input-contail'>
            <label>用户名</label>
            <input type="text" 
                   
                  autofocus
                  v-model='current.$unique'>
           
          </div>
          <div class='input-contail'>
            <label >密码</label>
            <input type="password" 
                  
                   id='password' 
                  v-model='current.password'>
                  
          </div>
          <div class='input-contail'>
            <button type="submit" class='btn-primary'>登录</button>
          </div>
          <div class='gosignup'>没有账号？
            <a href="#/signup">注册</a>
          </div>
          <p class="well">
             测试账号 <br>
             <strong>用户名</strong> admin<br>
             <strong>密码</strong> yoyoyo
           </p>
        </form>
      </div>
      
    </div>
   
   

  </div>
</template>
<script>
import "../css/single-form.css";
import Nav from "../components/Nav.vue";
//import AdminFooter from "../components/AdminFooter.vue";
import api from '../lib/api';
import session from '../lib/session.js';

//import validator from "../directive/validator";


export default {
  //directives: { validator },
  components: { Nav},
  data(){
    return{
      current:{},
      login_failed:false,
    };
  },

  methods:{
    submit(e){
      e.preventDefault();
      let unique,password;

      if(!(unique=this.current.$unique) ||
      !(password=this.current.password))
      return;
      //整个页面提交的时候先判断是否有用户名或者密码 ，没有就返回，然后就会发请求，
      //请求里面传的where也是判断用户名，可以是username，phone，或者mail，
     //然后会返回数据，
      if(unique === 'admin' && password==='yoyoyo'){
        this.on_login_succeed({ id:1,username:'admin',is_admin:'true'});
        return;
       };     
      // api('user/read',{
      //   where:{
      //     or:[
      //       ['username','=',unique],
      //       ['phone','=',unique],
      //       ['mail','=',unique],
      //     ],
      //   },
      //   }).then(r=>{
      //   let row;
      //   //返回里面r.data[0]就是username，如果没有密码或者用户名，就是登陆失败
      //   console.log(r.data)
      //   if(!(row=r.data[0]) || row.password !==password){
      //     this.login_failed=true;
      //     return;
      //   }
      //   //然后就是登陆成功，要删除密码，不能全都存在localStorage
      //   //把那一行存进去
      //   this.on_login_succeed(row);
       
      // });

      session
      .exist(unique,password)
      .then(row=>{
        if(!row){
          this.login_failed=true;
          return;
        }
        this.on_login_succeed(row);
      });

      
    },
    on_login_succeed(row){
          this.login_failed=false;
        delete row.password;
        session.login(row);

        alert('登录成功');

        if(session.is_admin()){
          this.$router.push('/admin/order');
          return;
        }
        this.$router.push('/');
       }
  }
};
</script>
 <style scoped>
.input-contail [type="submit"] {
  padding: 8px;
  
}



.btn-primary

{
  background:rgb(231, 160, 160);
  border-color:rgb(231, 160, 160);
  
}
.btn-primary:hover{
      background: rgb(248, 130, 130);
      border-color: rgb(248, 130, 130);
  }
.time {
  text-align: right;
}
.main-form {
 width:300px;
 position:fixed;
 
 right:200px;
}
.header {
  
  /* background-image: url(../assets/login.png); */
  /* background-repeat: no-repeat;
  background-size: 100%;
  max-width: 600px; */
}
.btn-group button:last-child{
  margin-left:0;
}

.main-form .gosignup {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  margin-top: 20px;
  margin-bottom: 30px;
}
.well {
 	 -webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;
 	 background: #f0f0f0;
 	 padding: 10px;
   }
  button{
    margin-top:20px;
  }
  .input-contail{
    margin-top:10px;
  }
</style>
