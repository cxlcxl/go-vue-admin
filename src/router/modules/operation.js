import Layout from '@/layout'
import LayoutMenu from '@/views/third-menu'

const optRouter = {
  path: '/data',
  component: Layout,
  redirect: '/data/adx/detail',
  meta: { title: '运营数据', icon: 'el-icon-data-analysis' },
  children: [
    {
      path: 'adx',
      component: LayoutMenu,
      redirect: '/data/adx/detail',
      meta: { title: '聚合广告数据' },
      children: [
        {
          path: 'detail',
          name: 'DataDetail',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '广告详情数据' }
        },
        {
          path: 'custom',
          name: 'DataCustom',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '定制渠道数据' }
        },
        {
          path: 'report',
          name: 'DataReport',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '广告报表' }
        },
        {
          path: 'foreign',
          name: 'DataForeign',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '对外数据' }
        }
      ]
    },
    {
      path: 'setting',
      component: LayoutMenu,
      redirect: '/data/setting/cron',
      meta: { title: '数据配置' },
      children: [
        {
          path: 'cron',
          name: 'DataCron',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '数据管理' }
        },
        {
          path: 'cookie',
          name: 'DataCookie',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '广告商 COOKIE' }
        }
      ]
    },
    {
      path: 'divide',
      component: LayoutMenu,
      redirect: '/data/divide/global',
      meta: { title: '分成配置' },
      children: [
        {
          path: 'global',
          name: 'DataGlobal',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '全局配置' }
        },
        {
          path: 'developer',
          name: 'DataDeveloper',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '开发者配置' }
        },
        {
          path: 'game',
          name: 'DataGame',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '游戏配置' }
        },
        {
          path: 'channel',
          name: 'DataChannel',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '渠道配置' }
        },
        {
          path: 'cp',
          name: 'DataCp',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: 'CP 配置' }
        }
      ]
    }
  ]
}
export default optRouter
