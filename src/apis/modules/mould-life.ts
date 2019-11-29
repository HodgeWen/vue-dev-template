import { httpWithToken } from '../axios'

/**
 * 新增故障报修
 * @param data 
 */
export const increaseScrapRegistration = (data: {
  code: string;
  scrapType: string;
  scrapReason?: string;
}) => httpWithToken.post('/mouldScrap/', data)