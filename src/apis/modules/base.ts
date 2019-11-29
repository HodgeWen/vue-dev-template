import { httpWithToken } from '../axios.js'
import { BinaryLike } from 'crypto'

// 角色
/**
 * 添加角色
 */
export const increaseRole = (data: {
  code: string; // 编码
  name: string; // 名称
  note?: string; // 描述
}) => httpWithToken.post('/role/', data)

/**
 * 根据角色id删除角色
 */
export const deleteRole = (id: string) => httpWithToken.delete(`/role/${id}`)

/**
 * 根据角色id更新角色
 */
export const updateRole = (
  id: string,
  data: {
    version: number; // 版本号
    code: string; // 编码
    name: string; // 名称
    note?: string; // 描述
  }
) => httpWithToken.put(`/role/${id}`, data)

/**
 * 验证角色唯一性
 */
export const validateRole = (data: {
  id: string
  uniqueValue: string
  parentId: string
}) => httpWithToken.post('/role/exists/code', data)

/**
 * 查询角色权限
 */
export const fetchRolePermissions = (roleId: string) => httpWithToken.get(`/menu/roleMenuList/${roleId}`)

// 组织
/**
 * 获取组织树
 */
export const fetchOrganizationTree = () => httpWithToken.get('/organization/tree')

// 用户
/**
 * 增加用户
 */
export const increasePersonnel = (data: {
  attachmentType?: string
  code?: string
  email?: string
  file: BinaryLike;
  mobile: string
  name: string
  note: string
  password: string
  qrCode: string
  shiftId: string
}) => httpWithToken.post('/principal/', data)

/**
 * 删除用户
 */
export const deletePersonnel = (id: string) => httpWithToken.delete(`/principal/${id}`)

/**
 * 更新用户
 */
export const updatePersonnel = (
  id: string,
  data: {
    version: number
    attachmentType?: string
    code?: string
    email?: string
    file: BinaryLike
    mobile: string
    name: string
    note: string
    password: string
    qrCode: string
    shiftId: string
  }
) => httpWithToken.put(`/principal/${id}`, data)

/**
 * 验证工号的唯一性
 */
export const validatePrincipalQrcode = (data: any) => httpWithToken.post('/principal/exists/qrCode', data)

/**
 * 切换用户状态(启用/禁用)
 */
export const togglePrincipalStatus = (data: {
  id: string
  isDelete: 0 | 1
}) => httpWithToken.put('/principal/tombstone/isDelete', data)

// 班次

/**
 * 新增班次
 */
export const increaseShift = (data: {
  code: string
  onDuty: string
  offDuty: string
}) => httpWithToken.post('/shift/', data)

/**
 * 删除班次
 */
export const deleteShift = (id: string) => httpWithToken.delete(`/shift/${id}`)

/**
 * 更新班次
 */
export const updateShift = (
  id: string,
  data: {
    version: number
    code: string
    onDuty: string
    offDuty: string
  }
)  => httpWithToken.put(`/shift/${id}`, data)

/**
 * 验证班次编码是否存在
 */
export const validateShiftCode = (data: {
  uniqueValue: string;
  id?: string;
  parentId?: string;
}) => httpWithToken.post('/shift/exists/code', data)

/**
 * 获取班次列表
 */
export const fetchShiftList = () => httpWithToken.post('/shift/list', {})

/**
 * 换班
 */
export const changeShift = () => httpWithToken.put('/shift/change')
