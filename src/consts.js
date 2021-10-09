// 平台
export const Platform = { 1: 'Android', 2: 'IOS', 3: 'H5' }
// 主题色
export const Color = { 'success': '#13ce66', 'error': '#ff4949' }
// 用户审核信息
export const UserCheckType = { '1': '已审核', '-1': '审核不通过', '0': '审核中' }
// 用户相关
export const OperatorUser = 1
export const AdsUser = 2
export const DeveloperUser = 3
export const GDTUser = 4
export const SPMUser = 5
export const IDTUser = 6
export const UserType = {
  [OperatorUser]: '运营用户',
  [AdsUser]: '广告主用户',
  [DeveloperUser]: '开发者用户',
  [GDTUser]: '广点通用户',
  [SPMUser]: '投放用户',
  [IDTUser]: 'IDT用户'
}
export const RegisterType = { 1: '个人', 2: '企业' }
// 流量配置系统版本
export const SysVersionConfig = { 1: '高于', 2: '低于', 3: '等于' }
