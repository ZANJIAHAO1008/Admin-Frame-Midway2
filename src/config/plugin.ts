import { EggPlugin } from 'egg';
export default {
  logrotator: false, // disable when use @midwayjs/logger
  static: false,
  mysql: {
    enable: true,
    package: 'egg-mysql',
  }
} as EggPlugin;
