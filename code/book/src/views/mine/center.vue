<template>
	<div>
		<div id="userinfo">
			<img class="userHead" :src="$store.state.user.userHead" />
			<input type="file" name="file" value="上传头像" @change="handleToUpload" />
			<div class="user">
				<div class="username">{{ $store.state.user.name }}</div>
				<div v-if="$store.state.user.isAdmin">
					用户身份：管理员
					<a href="/admin" target="_blank">进入管理后台</a>
				</div>
				<div v-else class="identity">普通会员</div>
			</div>
		</div>
		<router-link tag="div" to="uploadbook" class="tab">
			上传图书
			<span>></span>
		</router-link>
		<router-link tag="div" to="userbook" class="tab">
			我的书籍
			<span>></span>
		</router-link>
		<router-link tag="div" to="uploadmsg" class="tab">
			社区留言
			<span>></span>
		</router-link>
		<router-link tag="div" to="usermsg" class="tab">
			我的留言
			<span>></span>
		</router-link>
		<div class="tab">
			<a href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=160050245&card_type=group&source=qrcode">后台反馈</a>
			<span>></span>
		</div>
		<div class="exist"><a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
	</div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';
export default {
	name: 'center',
	methods: {
		handleToLogout() {
			this.axios.get('/api2/users/logout').then(res => {
				var status = res.data.status;
				if (status === 0) {
					localStorage.removeItem('name');
					localStorage.removeItem('isAdmin');
					this.$store.commit('user/USER_NAME', { name: '', isAdmin: false, userHead: '' });
					this.$router.push('/mine/login');
				}
			});
		},
		handleToUpload(ev) {
			var file = ev.target.files[0];
			var param = new FormData();
			param.append('file', file, file.name);
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			this.axios.post('/api2/users/uploadUserHead', param, config).then((res) => {
				var status = res.data.status;
				var This = this;
				This.$store.commit('user/USER_NAME', {
					name: This.$store.state.user.name,
					isAdmin: This.$store.state.user.isAdmin,
					userHead: res.data.data.userHead + '?' + Math.random()
				});
			});
		}
	},
	beforeRouteEnter(to, from, next) {
		axios.get('/api2/users/getUser').then(res => {
			var status = res.data.status;
			if (status === 0) {
				next(vm => {
					localStorage.setItem('name', res.data.data.username);
					localStorage.setItem('isAdmin', res.data.data.isAdmin);
					vm.$store.commit('user/USER_NAME', {
						name: res.data.data.username,
						isAdmin: res.data.data.isAdmin,
						userHead: res.data.data.userHead
					});
				});
			} else {
				next('/mine/login');
			}
		});
	}
};
</script>

<style scoped>
#userinfo {
	height: 150px;
	width: 100%;
	margin-top: 10px;
	border-bottom: 1px #333333 solid;
}
#userinfo .userHead {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	overflow: hidden;
	display: block;
	float: left;
	position: relative;
	margin-top: 20px;
}
#userinfo input {
	position: absolute;
	height: 100px;
	width: 100px;
	top: 20px;
	display: block;
	opacity: 0;
}
.user {
	height: 150px;
	margin-left: 15px;
	width: 50%;
	float: left;
	color: #00b7ff;
	margin-left: 50px;
}
.user .username {
	height: 50px;
	font-size: 20px;
	line-height: 50px;
}
.user .identity {
	height: 30px;
	font-size: 16px;
	text-align: center;
	width: 80px;
	line-height: 30px;
	border: 1px #990055 solid;
	border-radius: 10px;
}
.tab {
	width: 100%;
	height: 50px;
	border-bottom: 1px #cccccc solid;
	font-size: 18px;
	text-indent: 1em;
	line-height: 50px;
	margin-top: 15px;
}
.tab span {
	display: block;
	height: 50px;
	width: 20;
	float: right;
}
.tab a{
	text-decoration: none;
	color: #000000;
}
.exist {
	background: #007aff;
	height: 50px;
	margin-top: 30px;
	text-align: center;
	line-height: 50px;
}
.exist a {
	text-decoration: none;
	color: white;
	font-size: 24px;
}
</style>
