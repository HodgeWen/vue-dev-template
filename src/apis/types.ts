export interface Res <T = any> {
  code: 500 | 400 | 401 | 404 | 405 | 408 | 200;
  msg: string;
  content: T;
}