<template>

	<div :style="{width: width}" class="card   side-nav">
		<router-link class="nav-item" to="/admin/category">分类管理</router-link>
		<router-link class="nav-item" to="/admin/breed">品种管理</router-link>
		<router-link class="nav-item" to="/admin/order">订单管理</router-link>
		<router-link class="nav-item" to="/admin/pet">宠物管理</router-link>
		<router-link class="nav-item" to="/admin/user">用户管理</router-link>
		
	</div>
</template>


<script>
export default {
  props: ["width"]
};
</script>

<style scoped>
.side-nav {
	background: #fff;
	margin-left: -15px;
	max-width:280px;
}

.nav-item {
  color: #555;
  display: block;
  padding: 10px 20px;
}

.nav-item.active,
.nav-item.router-link-active,
.nav-item:hover {
	color: rgb(231, 160, 160);
		text-decoration: none;
}


.nav-item:hover {
	background:rgb(231, 160, 160);
	color:#fff;
	
}

</style>