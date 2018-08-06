 <template>
	<div class='setting'>
		<div class="card">
			<h2>常规设置</h2>
			<!-- <div class="tool-bar"></div> -->
			<div>
				<div class="cute-form">
					<form @submit.prevent="submit('username')" v-if="show.username" class="input-group">
						<!-- <input style="width: 60%;" type="text" v-model="current.username" autofocus>
						<button type="submit" style="width: 20%;" class="btn-primary">提交</button>
						<button @click="show.username=false" type="button" style="width: 20%;">取消</button> -->
						 <div class="input-group">
							<input type="text"  v-model="current.username"  class="form-control">
							<span type="submit" class="input-group-addon">提交</span>
							<span   @click="show.username=false" type="button" class="input-group-addon">取消</span>
           </div>
					</form>
					<div v-else>
						<span class="key">用户名</span>
						<span class="value">{{current.username || '-'}}</span>
						<span @click="show.username=!show.username" class="anchor">编辑</span>
					</div>
				</div>
				
				<div class="cute-form">
					<form @submit.prevent="submit('intro')" v-if="show.intro" class="input-group">
						<!-- <input style="width: 60%;" type="text" v-model="current.intro" autofocus>
						<button type="submit" style="width: 20%;" class="btn-primary">提交</button>
						<button @click="show.intro=false" type="button" style="width: 20%;">取消</button> -->
						<div class="input-group">
							<input type="text"  v-model="current.intro"  class="form-control">
							<span type="submit" class="input-group-addon">提交</span>
							<span   @click="show.intro=false" type="button" class="input-group-addon">取消</span>

						</div>
					</form>
					<div v-else>
						<span class="key">签名</span>
						<span class="value">{{current.intro || '-'}}</span>
						<span @click="show.intro=!show.intro" class="anchor">编辑</span>
					</div>
				</div>
			</div>
		</div>
		<div class="card">
			<h2>安全设置</h2>
			<div>
				<div class="cute-form">
					<form @submit.prevent="change_password('password')" v-if="show.password" class="input-group">
						<!-- <input style="width: 30%;" type="password" v-model="password.old" autofocus placeholder="旧密码">
						<input style="width: 30%;" type="password" v-model="password.new" autofocus placeholder="新密码">
						<button type="submit" style="width: 20%;" class="btn-primary">提交</button>
						<button @click="show.password=false" type="button" style="width: 20%;">取消</button> -->
						<div class="input-group">
							<input type="text" style="width: 50%;" v-model="password.old" placeholder="旧密码"  class="form-control">
							<input type="text" style="width: 50%;"  v-model="password.new" placeholder="新密码"  class="form-control">
							<span type="submit" class="input-group-addon">提交</span>
							<span   @click="show.password=false" type="button" class="input-group-addon">取消</span>

						</div>
					</form>
					<div v-else>
						<span class="key">密码</span>
						<span @click="show.password=!show.password" class="anchor">修改密码</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
 	
<script>
import session from "../lib/session";
import api from "../lib/api";

export default {
  data() {
    return {
      error: {
        invalid_old_password: false
      },
      password: {
        new: "",
        old: ""
      },
      show: {
        username: false,
        password: false,
        intro: false
      },
      current: session.uinfo()
    };
  },

  methods: {
    submit(property) {
      api("user/update", this.current).then(r => {
        session.replace_uinfo(r.data);
        this.show[property] = false;
      });
    },

    reset() {
      this.show = {
        username: false,
        password: false
      };
    },

    change_password() {
      let u = session.uinfo();
      let unique = u.username || u.phone || u.email;

      session.exist(unique, this.password.old).then(row => {
        row ? this.update_password() : this.error.invalid_old_password;
      });
    },

    update_password() {
      return api("user/update", {
        id: this.current.id,
        password: this.password.new
      }).then(r => {
        alert("密码修改成功");
        session.logout("#/login");
      });
    }
  }
};
</script>
<style scoped>
.setting {
	background:#fff;
	
}
.anchor{
	padding-left: 10px;
	color:rgba(0,0,0,0.4)
}

.card{
	padding:20px 40px;

}
.value{
margin-left: 5px;
}
</style>

 	