/**
 * @description User-Service parameters
 */
export interface Message {  //返回信息
  code: number;
  message: string;
  data: object | null;
  serverTime: Date
}
export interface UserInter {  //用户信息
  username: string;
  password: number;
  sex: number;
  staffName: string;
  phone: string,
  address: string
}
export interface UserQuery {  //用户查询条件
  staffName: string;
  staffId: string;
  pageSize: number,
  page: number,
}
export interface Authorization {  //token
  Header: object;
  Payload: object;
  Signature: string;
}

export interface GetField {  //GET请求
  select: string;
  model: Array<any>;
  where: Object;
}

export interface PostField {  //POST请求
  into: any;
  values: Array<Object>;
}

export interface PutField {  //Put请求
  update: any;
  set: any;
  where:object;
}

export interface DelField {  //DELETE请求
  from: any;
  where: Object;
}
