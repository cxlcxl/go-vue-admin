import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/app',
    method: 'get',
    params
  })
}

export function getFlowList(params) {
  return request({
    url: '/api/flow',
    method: 'get',
    params
  })
}

export function deleteFlowConf(id) {
  return request({
    url: '/api/flow/delete',
    method: 'post',
    data: {
      id
    }
  })
}

export function flowConfDetail(params) {
  return request({
    url: '/api/flow/detail',
    method: 'get',
    params
  })
}

