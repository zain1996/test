let operate = [
  { path: 'memberCardManage',id: 'memberCardManage',name: '会员卡管理',component: () => import('@/views/operate/memberCard/list.vue'), noDropdown:true},
  { path: 'advertisingManage',component:() => import('@/views/layout/routerView.vue'), name: '广告管理', children:[
      { path: 'appManage',component:() => import('@/views/operate/advertising/app/list.vue'), name: '广告APP'},
      { path: 'pcManage',component:() => import('@/views/operate/advertising/pc/list.vue'), name: '广告PC'},
    ]
  },{ path: 'informationManage',component:() => import('@/views/layout/routerView.vue'), name: '资讯管理', children:[
      { path: 'appManage',component:() => import('@/views/operate/information/app/list.vue'), name: '资讯APP'},
      { path: 'pcManage',component:() => import('@/views/operate/information/pc/list.vue'), name: '资讯PC'},
    ]
  },{ path: 'evaluateManage',component:() => import('@/views/layout/routerView.vue'), name: '评价管理', children:[
      { path: 'curriculum',component:() => import('@/views/operate/evaluate/curriculum/list.vue'), name: '课程评价'},
      { path: 'platform',component:() => import('@/views/operate/evaluate/platform/list.vue'), name: '平台评价'},
    ]
  },
  { path: 'blackList',id: 'blackList',name: '黑名单',component: () => import('@/views/operate/blackList/list.vue'), noDropdown:true},
  { path: 'sensitiveWords',id: 'sensitiveWords',name: '敏感词',component: () => import('@/views/operate/sensitiveWords/list.vue'), noDropdown:true},
  { path: 'versionManage',id: 'versionManage',name: '版本管理',component: () => import('@/views/operate/version/list.vue'), noDropdown:true},
  { path: 'terminalManage',id: 'terminalManage',name: '终端管理',component: () => import('@/views/operate/terminal/list.vue'), noDropdown:true},
  { path: 'feedbackList',id: 'feedbackList',name: '反馈列表',component: () => import('@/views/operate/feedbackList/list.vue'), noDropdown:true},
  { path: 'commonProblem',id: 'commonProblem',name: '常见问题',component: () => import('@/views/operate/commonProblem/list.vue'), noDropdown:true},
  { path: 'potentialCustomers',id: 'potentialCustomers',name: '潜在客户',component: () => import('@/views/operate/potentialCustomers/list.vue'), noDropdown:true},
]
export default operate;
