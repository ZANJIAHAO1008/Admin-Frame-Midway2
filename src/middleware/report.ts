import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ReportMiddleware implements IWebMiddleware {

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      // 控制器前执行的逻辑
      // const startTime = Date.now();

      // 执行下一个 Web 中间件，最后执行到控制器
      await next();
      // 控制器之后执行的逻辑
      // console.log(ctx.host,Date.now() - startTime);
    };
  }

}