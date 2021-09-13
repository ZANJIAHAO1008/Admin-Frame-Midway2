//公共方法
import { Authorization,Message } from '../interface/interface';
const moment = require('moment');
const jwt = require('jsonwebtoken')

//时间过滤
export function format(data: any) {
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
}

//token生成
export function generateToken(data: Authorization): Promise<string> {
    return jwt.sign(data.Header, data.Signature, data.Payload)
}

export function success(result: Object):Message{ //成功返回
    return { code: 200, message: result[0], data: result[1], serverTime: format(new Date()) };
}

export function error(result: Object):Message{ //失败返回
    return { code: 500, message: result[0], data: result[1], serverTime: format(new Date()) };
}