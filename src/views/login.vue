<template>
    <div class="login">
        <div class="login-box">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="用户名">
					<el-input type="text" v-model="form.username" maxlength="12" placeholder="请输入用户名、邮箱或手机号"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="form.password" maxlength="16" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
				</el-form-item>
  				<el-form-item style="margin-top: 30px;">
					<el-button @click="jumpJoin">注册</el-button>
					<el-button type="text" style="color:#aaa;">找回密码？</el-button>
    				<el-button type="primary" @click="login">登录</el-button>
  				</el-form-item>
			</el-form>
		</div>
    </div>
</template>

<script>
import API from "../fetch/api.js";
import store from "../../store/store"
export default {
	data(){
		return {
			form: {
				username:'',
				password:'',
			}
		}
	},
	mounted(){

	},
    methods:{
        jumpJoin(){
			this.$router.push({path:'/join'})
		},
		login(){
			var self=this;
			API.login(self.form).then(res => {
				if(res.code=="200"){
					// this.$message.success('登录成功');
					let data = res.data;
					//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
					this.$store.commit('set_token', data.token);
					this.$store.commit('set_username', data.username);
					if (store.state.token) {
						// self.$router.push({name:'index', params:{"username":self.form.username}})
						// self.$router.push({path:'/', query:{"username":self.form.username}})
						// self.$router.push({name:'challenge', params:{"username":data.username}});
						self.$router.push({path:'/challenge'});
					}else {
						self.$router.replace('/login');
					}
				}else{
					console.log(res.body)
				}
			})
		}
    }
}
</script>


<style lang="scss">
.login{
	.login-box{
		min-width: 400px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -200px;
		margin-top: -150px;
	}
}
</style>

