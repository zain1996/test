let content = [
  { path: 'curriculum',component:() => import('@/views/layout/routerView.vue'), name: '课程', children:[
      { path: '1',component:() => import('@/views/content/curriculum/list.vue'), name: '课程科目一'},
      { path: '2',component:() => import('@/views/content/curriculum/list.vue'), name: '课程科目二'},
      { path: '3',component:() => import('@/views/content/curriculum/list.vue'), name: '课程科目三'},
      { path: '4',component:() => import('@/views/content/curriculum/list.vue'), name: '课程科目四'},
      { path: 'coach',component:() => import('@/views/content/curriculum/list.vue'), name: '课件教练员'},
    ]
  },
  { path: 'courseware',id: 'courseware',name: '课件',component: () => import('@/views/content/courseware/list.vue'), noDropdown:true},
  { path: 'questionList',component:() => import('@/views/layout/routerView.vue'), name: '试题列表', children:[
      { path: '1',component:() => import('@/views/content/question/list.vue'), name: '试题科目一'},
      { path: '2',component:() => import('@/views/content/question/list.vue'), name: '试题科目二'},
      { path: 'coach',component:() => import('@/views/content/question/list.vue'), name: '试题教练员'},
    ]
  },
  { path: 'iconManage',id: 'iconManage',name: '图标管理',component: () => import('@/views/content/icon/list.vue'), noDropdown:true},
  { path: 'voice',component:() => import('@/views/layout/routerView.vue'), name: '语音', children:[
      { path: 'speechSimulation',component:() => import('@/views/content/voice/speechSimulation/list.vue'), name: '语音模拟'},
      { path: 'lighting',component:() => import('@/views/content/voice/lighting/list.vue'), name: '灯光模拟'},
    ]
  },
]
export default content;
