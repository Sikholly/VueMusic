import Vue from "vue";
import VueRouter from "vue-router";
//引入组件
//注册router
Vue.use(VueRouter);
// 一级
import gegeRecommend from '../components/views/ShowRegion/gegeRecommend'
//视频
import radioStation from '../components/views/ShowRegion/radioStation'

// 搜索
import searchSongs from '../components/views/ShowRegion/searchSongs'
import recommendItem from '../components/views/ShowRegion/recommendItem'
export default new VueRouter({
	routes: [
		{
			path: "/",//路径为
			redirect:'/personality',
		},
		{
			// name: gegeRecommend,
			path: "/personality",//路径为
			component: gegeRecommend,//显示组件
		},
		{
			// name: recommendItem,
			path: "/personality/recommendItem",//路径为
			component: recommendItem //显示组件
		},
		{
			// name: searchSongs,
			path: "/searchSongs",//路径为
			component: searchSongs //显示组件
		},
		{
			// name: radioStation,
			path: "/radioStation",//路径为
			component: radioStation //显示组件
		},
	]
})