import Vue from 'vue';
import Router from 'vue-router';
/* layout template 模板文件*/
import Layout from '../views/layout/Layout.vue';
import statistics from '@/router/statistics' // 统计模块
import user from '@/router/user' // 用户模块
import system from '@/router/system' // 系统模块
import operate from '@/router/operate' // 运营模块
import order from '@/router/order' // 订单模块
import content from '@/router/content' // 内容模块

Vue.use(Router);
export const avoid = ['/statistics','/user','/operate','/content','/order','/licensing','/education','/traffic','/finance','/system']; //不做处理的路由

export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/indexNew.vue'), hidden: true },
    { path: '/404', component: () => import('@/views/error/404.vue'), hidden: true },
    { path: '/401', component: () => import('@/views/error/401.vue'), hidden: true },

    {
        path: '/',
        component: () => import('@/views/layout/Layout.vue'),
        redirect: '/statistics/dataStatistics',
        // redirect:'/operation/echarts',
        name: 'Home',
        hidden: true,
        children: [
            { path: 'dashboard', component: () => import('@/views/dashboard/index.vue'),name: '用户' },
            { path: 'welcome', component: () => import('@/views/dashboard/welcome.vue'),name: '欢迎' },
            { path: 'modifyPassword', component: () => import('@/views/dashboard/modifyPassword.vue') },
        ]
    }
];

export default new Router({
  //mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
    {
        path: '/statistics',
        id: 'statistics',
        component: Layout,
        name: '统计',
        children: statistics
    },
    {
        path: '/user',
        id: 'user',
        component: Layout,
        name: '用户管理',
        children: user
    },
    {
        path: '/system',
        id: 'system',
        component: Layout,
        name: '系统管理',
        children: system
    },
    {
        path: '/operate',
        id: 'operate',
        component: Layout,
        name: '运营管理',
        children: operate
    },
    {
        path: '/order',
        id: 'order',
        component: Layout,
        name: '订单管理',
        children: order
    },
    {
        path: '/content',
        id: 'content',
        component: Layout,
        name: '内容管理',
        children: content
    },
    { path: '*', redirect: '/401', hidden: true },
];