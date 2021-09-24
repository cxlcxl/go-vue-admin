import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function list(params) {
  return request({
    url: '/user/index',
    method: 'get',
    params
  })
}

export function changeUserGroup(data) {
  return request({
    url: '/user/change-group',
    method: 'post',
    data
  })
}

// 获取磨基财务主体
export function mobgiAccounts(params) {
  return request({
    url: '/user/mobgi-account',
    method: 'get',
    params
  })
}

export function doCheck(data) {
  return request({
    url: '/user/check',
    method: 'post',
    data
  })
}

export function resetPass(data) {
  return request({
    url: '/user/reset-pass',
    method: 'post',
    data
  })
}
