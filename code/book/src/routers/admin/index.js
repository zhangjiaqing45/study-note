export default {
	path: '/admin',
	component: () => import('@/views/Admin'),
	children: [{
			path: 'users',
			component: () => import('@/views/Admin/users.vue')
		},
		{
			path: 'book',
			component: () => import('@/views/Admin/book.vue')
		},
		{
			path: 'msglist',
			component: () => import('@/views/Admin/msglist.vue')
		},
		{
			path: '/admin',
			redirect: '/admin/users'
		}
	]
}
