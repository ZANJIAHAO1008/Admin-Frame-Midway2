//公共方法
import { Authorization } from '../interface';
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