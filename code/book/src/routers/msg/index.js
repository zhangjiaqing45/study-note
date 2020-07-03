export default {
	path : '/msg',
	component : () => import('@/views/msg'),
	children:[
		{
			path:'msgtext/:msgid',
			components:{
				default:() => import('@/views/msg'),
				msgtext:()=> import('@/views/msg/msgtext')
			},
			props:{
				msgtext:true
			}
		}
	]
}