<template>
	<div class="register_body">
		<span>图书上传</span>
		<div>
			图书名称：
			<input v-model="bookname" class="register_text" type="text" />
		</div>
		<div>
			图书分类：
			<select v-model="selectedOption" class="register_text">
				<option v-for="option in options" :value="option" :key="option">{{ option }}</option>
			</select>
		</div>
		<div>
			图书说明：
			<textarea rows="10" v-model="bookmsg" class="bookmsg"></textarea>
		</div>
		<div class="register_btn"><button @touchstart="handleToUploadBook">上传图书</button></div>
	</div>
</template>

<script>
import axios from 'axios';
import { messageBox } from '@/components/JS';

export default {
	name: 'uploadbook',
	data() {
		return {
			selectedOption: '',
			options: ['专业书籍', '课外书籍'],
			bookname: '',
			booksort: '',
			bookmsg: '',
			username: '',
			tel:''
		};
	},
	methods: {
		handleToUploadBook() {
			this.axios
				.post('/api2/book/uploadbook', {
					bookname: this.bookname,
					booksort: this.selectedOption,
					bookmsg: this.bookmsg,
					username: localStorage.getItem('username'),
					tel: localStorage.getItem('tel')
				})
				.then(res => {
					var status = res.data.status;
					var This = this;
					if (status === 0) {
						messageBox({
							title: '上传图书',
							content: '上传成功',
							ok: '确定',
							handleOk() {
								This.$router.push('/mine/userbook');
							}
						});
					} else {
						messageBox({
							title: '上传图书',
							content: res.data.msg + ', 请重新上传',
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
					localStorage.setItem('tel', res.data.data.tel);
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
.bookmsg {
	width: 98%;
	margin: 10px auto;
}
</style>
