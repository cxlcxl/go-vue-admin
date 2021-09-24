import Layout from '@/layout'
import MenuLayout from '@/views/third-menu'

const adxRouter = {
  path: '/adx',
  component: Layout,
  redirect: '/adx/flow/setting',
  name: 'Adx',
  meta: { title: '聚合投放配置', icon: 'el-icon-pie-chart' },
  children: [
    {
      path: 'flow',
      component: MenuLayout,
      redirect: '/adx/flow/setting',
      name: 'Flow',
      meta: { title: '流量管理' },
      children: [
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/views/adx/flow/setting'),
          meta: { title: '流量分配' }
        }
      ]
    }
  ]
}

export default adxRouter
