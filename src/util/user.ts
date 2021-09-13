import { Message, Authorization } from '../interface/interface';
import { Provide } from '@midwayjs/decorator';
import { format } from './public';
const jwt = require('jsonwebtoken');
const screenKey = 'zanjiahao'; //生成uuid作为jwt密匙  
const uuidv3 = require('uuid/v3');
@Provide('UserUtil')
export class UserUtil {
    async success(result: Object): Promise<Message> { //成功返回
        return { code: 200, message: result[0], data: result[1], serverTime: format(new Date()) };
    }
    async error(result: Object): Promise<Message> { //失败返回
        return { code: 500, message: result[0], data: result[1], serverTime: format(new Date()) };
    }
    async generateToken(data: Authorization): Promise<string> {
        return jwt.sign(data.Header, data.Signature, data.Payload)
    }
    verifyToken(tokenJson) {
        return jwt.verify(tokenJson, this.uuid())
    }
    uuid() {
        return uuidv3(screenKey, uuidv3.DNS);
    }
}
