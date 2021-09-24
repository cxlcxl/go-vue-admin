/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/list',
  meta: { title: '用户管理', icon: 'el-icon-user' },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/users/list'),
      meta: { title: '用户列表' }
    },
    {
      path: 'group',
      name: 'UserGroup',
      component: () => import('@/views/users/group'),
      meta: { title: '权限组' }
    },
    {
      path: 'check',
      name: 'UserCheck',
      component: () => import('@/views/users/check'),
      meta: { title: '开发者审核列表' }
    },
    {
      path: 'reset-pass',
      name: 'UserResetPass',
      hidden: true,
      component: () => import('@/views/users/list')
    }
  ]
}

export default userRouter
