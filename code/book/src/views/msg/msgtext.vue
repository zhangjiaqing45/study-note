<template>
	<div class="blog-main slide-enter-active">
		<Header title="评论详情">
			<span @touchstart="handleToBack" class="back"><</span>
			<span @click="copy" class="iconfont share">&#xe874;</span>
		</Header>
		<loading v-if="isloading" />
		<div v-else class="blog-post">
			<h2 class="blog-post-title">{{ msgList[0].title }}</h2>
			<p class="blog-meta">{{ dateFormat(msgList[0].date) }}&nbsp;&nbsp;by&nbsp;&nbsp;{{ msgList[0].username }}</p>
			<p class="blog-meta">{{ msgList[0].tel }}</p>
			<hr />
			<p v-html="$options.filters.strFormat(msgList[0].text)" class="text"></p>
			<div><textarea rows="10" v-model="comment" class="msg"></textarea></div>
			<div class="comment_btn"><button @touchstart="handleToUploadComment">发表评论</button></div>
		</div>
		<div class="msg_body">
			<ul>
				<li v-for="item in commentList" :key="item._id">
					<div>
						<span>{{ item.comment }}</span>
						<span class="q">{{ item.username }}</span>
					</div>
					<div class="card">
						<div>{{ dateFormat(item.date) }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
import Clipboard from 'clipboard';
export default {
	name: 'msgtext',
	data() {
		return {
			msgList: [],
			isloading: true,
			comment: '',
			commentList: []
		};
	},
	components: {
		Header
	},
	filters: {
		strFormat(str) {
			var reg = new RegExp( '\n' , "g" )
			return str.replace(reg, '<br>');
		}
	},
	props: ['msgid'],
	methods: {
		handleToBack() {
			this.$router.back();
		},
		copy() {
			var url = window.location.href;
			var clipboard = new Clipboard('.share', {
				text: function() {
					return url;
				}
			});
			clipboard.on('success', e => {
				alert('链接复制成功');
				// 释放内存
				clipboard.destroy();
			});
			clipboard.on('error', e => {
				alert('该浏览器不支持自动复制!');
				// 不支持复制
				console.log(this, '该浏览器不支持自动复制!', 'warning');
				// 释放内存
				clipboard.destroy();
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
		},
		handleToUploadComment() {
			console.log(localStorage.getItem('username'));
			this.axios
				.post('/api2/comment/uploadComment', {
					comment: this.comment,
					msgid: this.msgList[0]._id,
					username: localStorage.getItem('username')
				})
				.then(res => {
					var status = res.data.status;
					var This = this;
					if (status === 0) {
						this.comment = '';
						alert('评论成功');
						location.reload();
					} else {
						alert('评论失败');
					}
				});
		}
	},
	mounted() {
		this.axios.get('/api2/msg/msgtext?_id=' + this.msgid).then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				setTimeout(() => {
					this.isloading = false;
				}, 300);
				this.msgList = res.data.data.msgList;
			}
		});
		this.axios.get('/api2/comment/commentList?msgid=' + this.msgid).then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.commentList = res.data.data.commentList;
			}
		});
	}
};
</script>

<style scoped>
.blog-main {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	min-height: 100%;
	background: #fff;
	width: 100%;
}
.back {
	width: 20px;
	height: 20px;
	font-size: 18px;
	display: block;
	float: left;
	position: relative;
	top: 15px;
}
.share {
	width: 20px;
	height: 20px;
	font-size: 18px;
	display: block;
	float: right;
	top: 15px;
	position: relative;
}

.blog-main.slide-enter-active {
	animation: 0.5s slideMove;
}
@keyframes slideMove {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0);
	}
}
.msg {
	display: block;
	width: 98%;
	margin: 10px auto;
}
.comment_btn {
	display: block;
	float: right;
}
.text {
	border-bottom: 1px #333333 solid;
}
.msg_body ul {
	margin:10px 12px; 
	overflow: hidden;
}
.msg_body li {
	border-bottom: 1px solid #e6e6e6;
	margin-bottom: 20px;
}
.msg_body div {
	margin-bottom: 10px;
}
.msg_body .q {
	font-size: 11px;
	color: #f03d37;
}

.msg_body .msg {
	font-size: 13px;
	color: #666;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.msg_body .card {
	display: flex;
}

.msg_body .card div {
	padding: 0 3px;
	height: 15px;
	line-height: 15px;
	border-radius: 2px;
	color: #f90;
	border: 1px solid #f90;
	font-size: 13px;
	margin-right: 5px;
}
</style>
