import { httpWithToken } from '../axios'

/**
 * 新增模具
 */
export const increaseMould = (data: {
  code: string
  tonnage: string
  material: string
  status: 'FREE' | 'OCCUPIED' | 'MAINTENANCE' | 'SCRAPPED'
  outputModulus: number
  factory: string
  site: string
  maxLife: number
  remindLife: number
  usedLife: number
  qrCode: string
  notes: string
  customerId: string
  outsourceId: string
}) => httpWithToken.post('/mould/', data)

/**
 * 更新模具
 */
export const updateMould = (id: string,
  data: {
    version: number
    code: string
    tonnage: string
    material: string
    status: 'FREE' | 'OCCUPIED' | 'MAINTENANCE' | 'SCRAPPED'
    outputModulus: number
    factory: string
    site: string
    maxLife: number
    remindLife: number
    usedLife: number
    qrCode: string
    notes: string
    customerId: string
    outsourceId: string
  }) => httpWithToken.put(`/mould/${id}`, data)

/**
 * 删除模具
 */
export const deleteMould = (id: string) => httpWithToken.delete(`/mould/${id}`)

/**
 * 模具编码存在校验
 */
export const validateMould = (data: {
  id?: string
  uniqueValue: string
  parentId: string
}) => httpWithToken.post('/mould/exists/code', data)

/**
 * 查询模具列表
 */
export const fetchMouldList = (data: {
  code?: string;
  tonnage?: string;
  material?: string;
  status?: 'FREE' | 'OCCUPIED' | 'MAINTENANCE' | 'SCRAPPED' | null;
  factory?: string;
  site?: string;
}) => httpWithToken.post('/mould/list', data)