let system = [
  { path: 'authority', icon: 'mobankuangjia', component: () => import('@/views/system/userManage/Authority.vue'), name: '权限配置', hidden: true},
  { path: 'userManagement',component: () => import('@/views/system/userManage/userManagement.vue'), name: '账户管理',noDropdown:true},
  { path: 'character',component: () => import('@/views/system/userManage/Character.vue'), name: '角色管理',noDropdown:true},
  { path: 'resourceMag',component: () => import('@/views/system/userManage/resourceMag.vue'), name: '资源管理',noDropdown:true},
  { path: 'regionalMag',component: () => import('@/views/system/userManage/RegionalMag.vue'), name: '地区管理',noDropdown:true},
  { path: 'simulationTestRules',component: () => import('@/views/system/simulationTestRules/list.vue'), name: '模拟考试规则设置',noDropdown:true},
]
export default system;

