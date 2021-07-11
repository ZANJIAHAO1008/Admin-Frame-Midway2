/**
 * @description User-Service parameters
 */
 export interface Message  {  //返回信息
  code:number,
  message: string;
  data:object,
  serverTime:Date
}
export interface UserInter {  //用户信息
  username: string;
  password: number;
  sex:number;
  staffName:string
}
export interface Authorization  {  //token
  Header:object;
  Payload:object;
  Signature:string
}

