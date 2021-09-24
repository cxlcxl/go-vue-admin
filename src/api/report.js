import request from '@/utils/request'

export function report(params) {
  return request({
    url: '/report/info',
    method: 'get',
    params
  })
}

