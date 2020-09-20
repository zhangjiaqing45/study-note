<template>
	<div class="register_body">
		<span>社区发言</span>
		<div>
			标题：
			<input v-model="title" class="register_text" type="text" />
		</div>
		<div>
			内容：
			<textarea rows="10" v-model="text" class="msg"></textarea>
		</div>
		<div class="register_btn"><button @touchstart="handleToUploadMsg">发表评论</button></div>
	</div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';

export default {
	name: 'uploadbook',
	data() {
		return {
			title: '',
			username: '',
			text: '',
			tel: ''
		};
	},
	methods: {
		handleToUploadMsg() {
			this.axios
				.post('/api2/msg/uploadMsg', {
					title: this.title,
					text: this.text,
					username: localStorage.getItem('username'),
					tel: localStorage.getItem('tel')
				})
				.then(res => {
					var status = res.data.status;
					var This = this;
					if (status === 0) {
						messageBox({
							title: '社区发言',
							content: '评论成功',
							ok: '确定',
							handleOk() {
								This.$router.push('/mine/center');
							}
						});
					} else {
						messageBox({
							title: '评论',
							content: res.data.msg + ', 请重新评论',
							ok: '确定'
						});
					}
				});
		}
	},
	beforeRouteEnter(to, from, next) {
		axios.get('/api2/users/getUser').then(res => {
			var ustatus = res.data.status;
			if (ustatus === 0) {
				next(vm => {
					localStorage.setItem('username', res.data.data.username);
					localStorage.setItem('academy', res.data.data.academy);
					localStorage.setItem('tel', res.data.data.tel);
					vm.$store.commit('user/USER_NAME', {
						username: res.data.data.username,
						academy: res.data.data.academy
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
#content .register_body {
	width: 100%;
}
.register_body .register_text {
	width: 100%;
	height: 40px;
	border: none;
	border-bottom: 1px #ccc solid;
	margin-bottom: 5px;
	outline: none;
	text-indent: 10px;
}
.register_body .register_btn {
	height: 50px;
	margin: 10px;
}

.register_body .register_btn button {
	width: 100%;
	height: 100%;
	background: #e54847;
	border-radius: 3px;
	border: none;
	display: block;
	color: white;
	font-size: 20px;
}
.msg {
	width: 98%;
	margin: 10px auto;
}
</style>
