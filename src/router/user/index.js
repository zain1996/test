let user = [
    { path: 'studentManage',id: 'studentManage',name: '学员管理',component: () => import('@/views/user/student/list.vue'), noDropdown:true},
    { path: 'studentDetail',id: 'studentDetail',name: '详情',component: () => import('@/views/user/student/detail.vue'), noDropdown:true},
    { path: 'content',id: 'content',name: '内容商',component: () => import('@/views/user/content/list.vue'), noDropdown:true},
    { path: 'driveSchoolManage',id: 'driveSchoolManage',name: '驾校管理',component: () => import('@/views/user/drive/list.vue'), noDropdown:true},
    { path: 'schoolTimeInquiry',id: 'schoolTimeInquiry',name: '学时查询',component: () => import('@/views/user/time/list.vue'), noDropdown:true},
    { path: 'simulationTestResults',id: 'simulationTestResults',name: '模拟考试成绩',component: () => import('@/views/user/simulation/list.vue'), noDropdown:true},
    { path: 'loginLog',id: 'loginLog',name: '登陆日志',component: () => import('@/views/user/login/list.vue'), noDropdown:true},
]
export default user;
