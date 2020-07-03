<template>
	<Collapse class="msg_body" ref="msg_body" accordion>
		<Panel v-for="item in msgList" :key="item._id" name="">
			{{ item.title }}
			<div class="btn_mall" @click="handelToDelete(item._id)">删除</div>
			<div slot="content">
				<p v-html="$options.filters.strFormat(item.text)"></p>
				<Collapse accordion @on-change="showCommentList(item._id)">
					<Panel>
						评论列表
						<p slot="content" >
							<ul v-for="val in commentList" :key="val._id">
								<li>{{ val.comment }}  <br>{{ dateFormat(val.date) }}&nbsp; by&nbsp;{{ val.username }}</li>
							</ul>
						</p>
					</Panel>
				</Collapse>
			</div>
		</Panel>
	</Collapse>
</template>

<script>
import axios from 'axios';
export default {
	name: 'msglist',
	data() {
		return {
			msgList: [],
			username: localStorage.getItem('username'),
			visible: false,
			commentList: []
		};
	},
	filters: {
		strFormat(str) {
			var reg = new RegExp('\n', 'g');
			return str.replace(reg, '<br>');
		}
	},
	mounted() {
		this.axios.get('/api2/msg/msgListbyUser?username=' + this.username).then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.msgList = res.data.data.msgList;
			}
		});
	},
	methods: {
		handelToDelete(msgid) {
			this.axios
				.post('/api2/msg/deleteMsg', {
					id: msgid
				})
				.then(res => {
					this.axios.get('/api2/msg/msgListbyUser?username=' + this.username).then(res => {
						var msg = res.data.msg;
						if (msg === 'ok') {
							this.msgList = res.data.data.msgList;
						}
					});
				});
		},
		showCommentList(msgid) {
			this.axios.get('/api2/comment/commentList?msgid=' + msgid).then(res => {
				var msg = res.data.msg;
				if (msg === 'ok') {
					this.commentList = res.data.data.commentList;
				}
			});
		},
		dateFormat(time) {
			var date = new Date(time);
			var year = date.getFullYear();
			var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
			var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
			var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
			var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
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
						username: res.data.data.username
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
.msg_body .btn_mall {
	width: 47px;
	height: 27px;
	float: right;
	top: 8px;
	position: relative;
	line-height: 28px;
	text-align: center;
	background-color: #f03d37;
	color: #fff;
	border-radius: 4px;
	font-size: 12px;
}
</style>
