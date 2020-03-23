import { httpDefault } from '../axios'

export const createAccount = (data) => httpDefault.post('/accounts', data)