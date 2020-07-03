<template>
	<div class="show_body" ref="show_body">
		<Loading v-if="isLoading" />
		<Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
			<ul>
				<li class="pulldown">{{ pullDownMsg }}</li>
				<li v-for="item in bookListP" :key="item._id">
					<div class="pic_show"><img :src="item.bookimg" /></div>
					<div class="info_list">
						<h2>{{ item.bookname }}</h2>
						<p>联系方式：{{ item.tel }}</p>
						<p>特殊说明：{{ item.bookmsg }}</p>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
export default {
	name: 'professional',
	data() {
		return {
			bookListP: [],
			pullDownMsg: '',
            isLoading : true
		};
	},
	activated() {
		this.axios.get('/api2/book/bookListP').then((res) => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.bookListP = res.data.data.bookListP;
				this.isLoading = false;
			}
		});
	},
	methods: {
		handleToScroll(pos) {
			if (pos.y > 30) {
				this.pullDownMsg = '正在更新中';
			}
		},
		handleToTouchEnd(pos) {
			if (pos.y > 30) {
				this.axios.get('/api2/book/bookListP').then((res) => {
					var msg = res.data.msg;
					if (msg === 'ok') {
						this.pullDownMsg = '更新成功';
						setTimeout(() => {
							this.bookListP = res.data.data.bookListP;
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
}
.show_body .pic_show img {
	width: 64px;
	height: 90px;
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
.pulldown {
	margin: 0;
	padding: 0;
	border: none;
}
</style>
