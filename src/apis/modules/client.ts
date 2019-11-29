import { httpWithToken } from '../axios.js'

// 客户信息-----------------------
/**
 * 新增客户
 */
export const increaseClient = (data: {
  customerName: string
  customerType: string
  contactPerson: string
  contactNumber: string
  remark: string
}) => httpWithToken.post('/customer/', data)

/**
 * 删除客户
 */
export const deleteClient = (id: string) => httpWithToken.delete(`/customer/${id}`)

/**
 * 更新客户
 */
export const updateClient = (
  id: string,
  data: {
    version: number
    customerName: string
    customerType: string
    contactPerson: string
    contactNumber: string
    remark: string
  }
) => httpWithToken.put(`/customer/${id}`, data)

/**
 * 拉取客户列表
 */
export const fetchClientList = (data: {
  customerName?: string
  customerType?: string
  contactPerson?: string
  contactNumber?: string
  isDelete?: 0 | 1
  remark?: string
  id?: string
}) => httpWithToken.post('/customer/list', data)
