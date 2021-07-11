import { App, Configuration } from '@midwayjs/decorator';
import { ILifeCycle } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as orm from '@midwayjs/orm';

@Configuration({
  importConfigs: [join(__dirname, './config')],
  imports: [
    orm                             // 加载 orm 组件
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady() {
    // const middware = [
    //   'reportMiddleware'
    // ]
    this.app.use(await this.app.generateMiddleware('reportMiddleware'));//全局中间件
  }
}
