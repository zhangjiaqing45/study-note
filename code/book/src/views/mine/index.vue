<template>
	<div id="main">
		<Header title="个人中心"/>
		<div id="content">
			<router-view />
		</div>
		<tabbar />
	</div>
</template>

<script>
	import Header from '@/components/Header';
	import tabbar from '@/components/tabbar';
	import login from '@/components/login';
	
	export default{
		name:'mine',
	components: {
		Header,
		tabbar,
		login
	}
	}
</script>

<style>
</style>
