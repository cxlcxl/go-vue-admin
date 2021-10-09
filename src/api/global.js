import request from '@/utils/request'

export function globalConst(code) {
  return request({
    url: '/consts/' + code,
    method: 'get'
  })
}
