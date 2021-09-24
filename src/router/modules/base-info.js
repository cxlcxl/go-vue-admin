import Layout from '@/layout'
import MenuLayout from '@/views/third-menu'

const BaseInfoRouter = {
  path: '/base',
  component: Layout,
  redirect: '/base/app/list',
  meta: { title: '基本信息', icon: 'el-icon-setting' },
  children: [
    {
      path: 'app',
      component: MenuLayout,
      redirect: '/base/app/list',
      meta: { title: '应用管理' },
      children: [
        {
          path: 'list',
          name: 'AppList',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '应用列表' }
        },
        {
          path: 'check',
          name: 'AppCheck',
          component: () => import('@/views/nested/menu1/menu1-3'),
          meta: { title: '应用审核' }
        }
      ]
    },
    {
      path: 'ads',
      component: MenuLayout,
      redirect: '/base/ads/list',
      meta: { title: '广告商管理' },
      children: [
        {
          path: 'group-list',
          name: 'AdxGroupList',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '广告商组列表' }
        },
        {
          path: 'list',
          name: 'AdsList',
          component: () => import('@/views/nested/menu1/menu1-3'),
          meta: { title: '广告商列表' }
        }
      ]
    },
    {
      path: 'channel',
      component: MenuLayout,
      redirect: '/base/channel/manage',
      meta: { title: '渠道清单管理' },
      children: [
        {
          path: 'manage',
          name: 'ChannelManage',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '渠道管理' }
        }
      ]
    },
    {
      path: 'mobile',
      component: MenuLayout,
      redirect: '/base/mobile/brand',
      meta: { title: '手机品牌管理' },
      children: [
        {
          path: 'brand',
          name: 'MobileBrand',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '品牌管理' }
        }
      ]
    },
    {
      path: 'info',
      component: MenuLayout,
      redirect: '/base/info/list',
      meta: { title: '基本信息' },
      children: [
        {
          path: 'list',
          name: 'InfoList',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '基本信息列表' }
        }
      ]
    },
    {
      path: 'tpl',
      component: MenuLayout,
      redirect: '/base/tpl/list',
      meta: { title: '原生模板' },
      children: [
        {
          path: 'list',
          name: 'TplList',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: '原生模板列表' }
        }
      ]
    }
  ]
}

export default BaseInfoRouter
