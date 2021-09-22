//公共方法
import { Authorization, Message, CheckDTO } from '../interface/interface';
const moment = require('moment');
const jwt = require('jsonwebtoken')
const screenKey = 'zanjiahao'; //生成uuid作为jwt密匙  
const { v3: uuidv3 } = require('uuid');
//时间过滤
export function format(data: any) {
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
}

//token生成
export function generateToken(data: Authorization): Promise<string> {
    return jwt.sign(data.Header, data.Signature, data.Payload)
}

//解析token
export function verifyToken(tokenJson) {
    return jwt.verify(tokenJson, uuid())
}

//根据key生成uid
export function uuid() {
    return uuidv3(screenKey, uuidv3.DNS);
}

//成功返回
export function success(result: Object): Message {
    return { code: 200, message: result[0], data: result[1], serverTime: format(new Date()) };
}

//失败返回
export function error(result: Object): Message {
    return { code: 500, message: result[0], data: result[1], serverTime: format(new Date()) };
}

//DTO校验返回
export function checkDTO(data: CheckDTO) {
    if (data?.isWrite) {
        if (!data?.value) {
            return `请填写${data?.prop}。`
        };
    };
    if (data?.isLength) {
        if (data?.value) {
            return `${data?.prop}格式为${data?.min}-${data?.max}位数，请重新再试。`
        }
    }
}