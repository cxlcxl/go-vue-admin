import Layout from '@/layout'

const financeRouter = {
  path: '/finance',
  component: Layout,
  redirect: '/finance/info',
  meta: { title: '财务管理', icon: 'el-icon-s-management' },
  children: [
    {
      path: 'info',
      name: 'FinanceInfo',
      component: () => import('@/views/charts/line'),
      meta: { title: '财务信息', noCache: true }
    },
    {
      path: 'contract',
      name: 'FinanceContract',
      component: () => import('@/views/charts/line'),
      meta: { title: '合同管理', noCache: true }
    },
    {
      path: 'subject',
      name: 'FinanceSubject',
      component: () => import('@/views/charts/line'),
      meta: { title: '磨基财务主体', noCache: true }
    },
    {
      path: 'summary',
      name: 'FinanceSummary',
      component: () => import('@/views/charts/line'),
      meta: { title: '开发者月度汇总', noCache: true }
    },
    {
      path: 'statement',
      name: 'FinanceStatement',
      component: () => import('@/views/charts/line'),
      meta: { title: '财务对账单', noCache: true }
    }
  ]
}

export default financeRouter
