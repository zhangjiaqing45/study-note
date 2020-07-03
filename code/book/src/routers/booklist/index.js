export default {
	path: '/booklist',
	component: () => import('@/views/booklist'),
	children: [{
			path: 'total',
			component: () => import('@/components/total')
		},
		{
			path: 'professional',
			component: () => import('@/components/professional')
		},
		{
			path: 'extra',
			component: () => import('@/components/extra')
		},
		{
			path: 'search',
			component: () => import('@/components/search')
		},
		{
			path: '/booklist',
			redirect: '/booklist/total'
		}
	]
}
