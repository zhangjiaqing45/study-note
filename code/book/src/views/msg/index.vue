<template>
	<div id="main">
		<Header title = "图书漂流"/>
		<div id="content">
			<msglist />
		</div>
		<tabbar />
		<router-view name="msgtext"/>
	</div>
</template>

<script>
	import Header from '@/components/Header';
	import tabbar from '@/components/tabbar';
	import msglist from '@/components/msglist';
	
	export default{
		name:'msg',
	components: {
		Header,
		tabbar,
		msglist
	}
	}
</script>

<style scoped>
	
</style>
