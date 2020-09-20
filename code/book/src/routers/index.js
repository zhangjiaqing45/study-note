import Vue from 'vue'
import Router from 'vue-router'
import booklistRouter from './booklist'
import mineRouter from './mine'
import msgRouter from './msg'
import adminRouter from './admin'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		booklistRouter,
		mineRouter,
		msgRouter,
		adminRouter,
		{
			path: '/*',
			redirect: '/booklist/total'
		}
	]
})
