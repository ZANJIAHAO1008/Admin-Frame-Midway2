
import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { LogService } from '../service/logService'

@Provide()
export class LogMiddleware implements IWebMiddleware {
    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {

            const props: Object = {
                userlogin: '登陆',
                useraddUser: '注册'
            };

            const dataWare: Object = {
                method: ctx?.method,
                type: props?.[ctx.url.split('/')[1] + ctx.url.split('/')[2]] ?? '未知',
                url: ctx?.url,
                host: ctx?.host,
            };

            const logService = await ctx.requestContext.getAsync<LogService>(LogService);

            logService.saveLog(dataWare);

            await next();

        };
    }
}
