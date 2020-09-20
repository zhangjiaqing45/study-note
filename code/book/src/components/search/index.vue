<template>
	<div class="search_body">
			<div class="search_input">
				<div class="search_input_wrapper">
					<i class="iconfont">&#xe87c;</i>
					<input type="text" v-model='message'>
				</div>					
			</div>
			<div class="search_result">
				<ul>
					<li v-for="item in bookList" :key="item._id">
						<div class="pic_show"><img :src="item.bookimg" /></div>
						<div class="info_list">
							<h2>{{item.bookname}}</h2>
							<p>联系方式：{{ item.tel }}</p>
							<p>特殊说明：{{ item.bookmsg }}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'search',
		data(){
			return{
				message:'',
				bookList:[]
			}
		},
		watch:{
			message(newVal){
				this.axios.get('/api2/book/search?bookname='+newVal).then((res)=>{
					var msg = res.data.msg;
					var books = res.data.data.bookList;
					if(msg&&books){
						this.bookList = res.data.data.bookList;
					}
				});
			}
		}
	}
</script>

<style scoped>
	#content .search_body {
		flex: 1;
		overflow: auto;
	}
	
	.search_body .search_input {
		padding: 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.search_body .search_input_wrapper {
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		display: flex;
		line-height: 20px;
	}
	
	.search_body .search_input_wrapper i {
		font-size: 16px;
		padding: 4px 0;
	}
	
	.search_body .search_input_wrapper input {
		border: none;
		font-size: 13px;
		color: #333;
		padding: 4px 0;
		outline: none;
		margin-left: 5px;
		width: 100%;
	}
	
	
	.search_body .search_result ul {
		margin: 0 12px;
		overflow: hidden;
	}
	
	.search_body .search_result ul li {
		margin-top: 12px;
		display: flex;
		align-items: center;
		border-bottom: 1px #e6e6e6 solid;
		padding-bottom: 10px;
	}
	
	.search_body .search_result .pic_show {
		width: 64px;
		height: 90px;
	}
	
	.search_body .search_result .pic_show img {
		width: 64px;
		height: 90px;
	}
	
	.search_body .search_result .info_list {
		margin-left: 10px;
		flex: 1;
		position: relative;
	}
	
	.search_body .search_result .info_list h2 {
		font-size: 17px;
		line-height: 24px;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.search_body .search_result .info_list p {
		font-size: 13px;
		color: #666;
		line-height: 22px;
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
