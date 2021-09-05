import { Provide, Inject } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { UserUtil } from '../util/user'

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  @Inject('UserUtil')
  userUtil: UserUtil;
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {

      if(ctx.url.split('/').includes('api')){
        //去除生产环境 接口自带api的问题(暂定,后期修改)
        let filterUrl = ctx.url.slice(4,ctx.url.length);
        ctx.url = filterUrl;
      }

      const url = ctx.url;
      const path = url.split('?')[0];//截取接口
      const token = ctx.get('Authorization'); //获取请求头中的token
      const whiteList = ['/user/login','/user/addUser']; //白名单


      if (whiteList.includes(path)) {
        //如果地址在白名单中则直接请求
        await next();
        return;
      }

      if (token) {
        try {
          // 挂载对象到当前请求上
          ctx.admin = this.userUtil.verifyToken(token);
        } catch (err) {
          this.nullToken(ctx);
          return;
        }
        if (ctx.admin) {
          if (ctx.admin.username == 'admin') {
            //如果是admin 则全部都可以进入 拥有任何权限
            await next();
            return;
          } else {

          }
        }
      } else {
        this.nullToken(ctx);
        
      }





      await next();

    };
  }
  nullToken(ctx: Context) {
    ctx.status = 401;
    ctx.body = {
      code: 401,
      message: '登录凭证失效或无权限访问',
    };
  }
}