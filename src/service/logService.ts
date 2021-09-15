import { Provide } from '@midwayjs/decorator';
import { Log } from '../entity/log';
import { Message } from '../interface/interface';
import { success } from '../util/public';
import { postMethod } from '../util/methods';
@Provide()
export class LogService {
    async saveLog(data): Promise<Message> {
        //保存日志
        await postMethod({
            into: Log,
            values: data,
        })
        
        return success(['添加成功', null])
    }
}
