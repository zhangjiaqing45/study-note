<template>
	<div class="msg_body" ref="msg_body">
		<Loading v-if="isLoading" />
		<Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
				<ul>
					<li class="pulldown">{{ pullDownMsg }}</li>
					<li v-for="item in msgList" :key="item._id" @tap="handleToDetail(item._id)">
						<div>
							<span>{{ item.title }}</span>
							<span class="q">{{ item.username }}</span>
						</div>
						<div class="msg">
							<span>{{ item.text }}</span>
						</div>
						<div class="card">
							<div>{{ dateFormat(item.date) }}</div>
						</div>
					</li>
				</ul>
		</Scroller>
	</div>
</template>

<script>
export default {
	name: 'msglist',
	data() {
		return {
			msgList: [],
			pullDownMsg: '',
            isLoading : true
		};
	},
	activated() {
		this.axios.get('/api2/msg/msgList').then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.msgList = res.data.data.msgList;
				this.isLoading = false;
			}
		});
	},
	methods: {
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
		 handleToDetail(msgid){
		    this.$router.push('/msg/msgtext/' + msgid);
		},
		handleToScroll(pos) {
			if (pos.y > 30) {
				this.pullDownMsg = '正在更新中';
			}
		},
		handleToTouchEnd(pos) {
			if (pos.y > 30) {
				this.axios.get('/api2/msg/msgList').then((res) => {
					var msg = res.data.msg;
					if (msg === 'ok') {
						this.pullDownMsg = '更新成功';
						setTimeout(() => {
							this.msgList = res.data.data.msgList;
							this.pullDownMsg = '';
						}, 1000);
					}
				});
			}
		}
	}
};
</script>

<style scoped>
.msg_body{
	flex:1; 
	overflow:auto;
}
	
.msg_body ul {
	margin:0 12px; 
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
.pulldown {
	margin: 0;
	padding: 0;
	border: none;
}
</style>
