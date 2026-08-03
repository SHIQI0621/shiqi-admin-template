import request from '@/utils/request'

// 用户相关接口
export interface User {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  status: number
  deptId: number
  deptName?: string
  roles?: string[]
  createTime: string
  avatar?: string
}

export interface UserQuery {
  page: number
  pageSize: number
  username?: string
  status?: number
}

// 获取用户列表
export function getUserList(params: UserQuery) {
  return request.get('/user/list', { params })
}

// 获取用户详情
export function getUserDetail(id: number) {
  return request.get('/user/detail', { params: { id } })
}

// 创建用户
export function createUser(data: Partial<User>) {
  return request.post('/user/create', data)
}

// 更新用户
export function updateUser(id: number, data: Partial<User>) {
  return request.put('/user/update', { id, ...data })
}

// 删除用户
export function deleteUser(id: number) {
  return request.delete('/user/delete', { params: { id } })
}

// 批量删除用户
export function batchDeleteUser(ids: number[]) {
  return request.post('/user/batch', { ids })
}

// 导出用户
export function exportUser(params: UserQuery) {
  return request.get('/user/export', { params, responseType: 'blob' })
}
