<template>
	<div id="main">
		<Header title="图书漂流" />
			<div id="content">
				<div class="main_menu">
					<router-link tag = "div" to = "/booklist/academy" class="academy_name">
						<span>全部</span>
					</router-link>
					<div class="sort">
						<router-link tag = "div" to = "/booklist/professional" class="sort_item">专业书籍</router-link>
						<router-link tag = "div" to = "/booklist/extra" class="sort_item">课外书籍</router-link>
					</div>
					<router-link tag = "div" to = "/booklist/search" class="search_entry">
						<i class="iconfont">&#xe87c;</i>
					</router-link>
				</div>
				<keep-alive>
					<router-view />
				</keep-alive>
			</div>
		<tabbar />
	</div>
</template>

<script>
import Header from '@/components/Header';
import tabbar from '@/components/tabbar';



export default {
	name: 'booklist',
	components: {
		Header,
		tabbar
	}
}
</script>

<style scoped>
	#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
	#content .main_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
	.main_menu .academy_name{ margin-left: 20px; height:100%; line-height: 45px;}
	.main_menu .academy_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .academy_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .sort{ display: flex; height:100%; line-height: 45px;}
	.main_menu .sort_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
	.main_menu .sort_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .sort_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
	.main_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.main_menu .search_entry i{  font-size:24px; color:red;}
</style>
