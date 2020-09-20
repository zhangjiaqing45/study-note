export default {
	path: '/mine',
	component: () => import('@/views/mine/index.vue'),
	children: [
		{
			path: 'center',
			component: () => import('@/views/mine/center.vue')
		},
		{
			path: 'login',
			component: () => import('@/components/login')
		},
		{
			path: 'register',
			component: () => import('@/components/register')
		},
		{
			path: 'findPassword',
			component: () => import('@/components/findpassword')
		},
		{
			path: 'uploadbook',
			component: () => import('@/components/uploadbook')
		},
		{
			path: 'uploadmsg',
			component: () => import('@/components/uploadmsg')
		},
		{
			path: 'userbook',
			component: () => import('@/components/userbook')
		},
		{
			path: 'usermsg',
			component: () => import('@/components/usermsg')
		},
		{
			path: '/mine',
			redirect: '/mine/center'
		}
	]
}
