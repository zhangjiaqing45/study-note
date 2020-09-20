<template>
	<div class="show_body">
		<ul>
			<li v-for="item in bookList" :key="item._id">
				<div class="pic_show">
					<img :src="item.bookimg" />
					<input type="file" name="file" value="上传图片" @change="handleToUpload($event,item._id)" />
				</div>
				<div class="info_list">
					<h2>{{ item.bookname }}</h2>
					<p>联系方式：{{ item.tel }}</p>
					<p>特殊说明：{{ item.bookmsg }}</p>
				</div>
				<div class="btn_mall" @click="handelToDelete(item._id)">删除</div>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'userbook',
	data() {
		return {
			username: localStorage.getItem('username'),
			bookList: []
		};
	},
	mounted() {
		this.axios.get('/api2/book/bookListbyUser?username=' + this.username).then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.bookList = res.data.data.bookList;
			}
		});
	},
	methods: {
		handleToUpload(ev,bookid) {
			var id = bookid;
			var file = ev.target.files[0];
			var param = new FormData();
			param.append('file', file, file.name);
			param.append('param',id)
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			this.axios.post('/api2/book/uploadbookImg',param,config).then((res) => {
				var status = res.data.status;
				location.reload();
			});
		},
		handelToDelete(bookid) {
			this.axios
				.post('/api2/book/deleteBook', {
					id: bookid
				})
				.then(res => {
					this.axios.get('/api2/book/bookListbyUser?username=' + this.username).then(res => {
						var msg = res.data.msg;
						if (msg === 'ok') {
							this.bookList = res.data.data.bookList;
						}
					});
				});
		}
	},
	beforeRouteEnter(to, from, next) {
		axios.get('/api2/users/getUser').then(res => {
			var ustatus = res.data.status;
			if (ustatus === 0) {
				next(vm => {
					localStorage.setItem('username', res.data.data.username);
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
#content .show_body {
	flex: 1;
	overflow: auto;
}
.show_body ul {
	margin: 0 12px;
	overflow: hidden;
}
.show_body ul li {
	margin-top: 12px;
	display: flex;
	align-items: center;
	border-bottom: 1px #e6e6e6 solid;
	padding-bottom: 10px;
}
.show_body .pic_show {
	width: 64px;
	height: 90px;
	position: relative;
}
.show_body .pic_show img {
	width: 64px;
	height: 90px;
}
.pic_show input{
	position: absolute;
	width: 50px;
	height: 70px;
	top: 20px;
	display: block;
	opacity: 0;
}
.show_body .info_list {
	margin-left: 10px;
	flex: 1;
	position: relative;
}
.show_body .info_list h2 {
	font-size: 17px;
	line-height: 24px;
	width: 150px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.show_body .info_list p {
	font-size: 13px;
	color: #666;
	line-height: 22px;
	width: 200px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.show_body .info_list .grade {
	font-weight: 700;
	color: #faaf00;
	font-size: 15px;
}
.show_body .info_list img {
	width: 100%;
	height: 100%;
	border-radius: 5%;
	position: absolute;
	right: 10px;
	top: 5px;
}

.show_body .btn_mall {
	width: 47px;
	height: 27px;
	line-height: 28px;
	text-align: center;
	background-color: #f03d37;
	color: #fff;
	border-radius: 4px;
	font-size: 12px;
	cursor: pointer;
}
</style>
