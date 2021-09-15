import { Controller, Post, Provide, Body, ALL, Inject } from '@midwayjs/decorator';
import { LogService } from "../service/logService";
import { Message } from '../interface/interface';

@Provide()
@Controller('/')
export class LogController {
    @Inject('LogService')
    logService: LogService;

    @Post('/log/save') //登陆日志
    async saveLog(@Body(ALL) data): Promise<Message> {
        const result = await this.logService.saveLog(data);
        return result;
    }
}