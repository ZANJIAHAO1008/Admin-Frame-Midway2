import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { User } from "../entity/userModel";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624933053463_3385';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.orm = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '974813758aa',
    database: 'userdb',
    synchronize: true,//自动创建表和列
    logging: false,
    entities: [User],//实体都必须在连接选项中注册
  }

  

  // config.security = {
  //   csrf: false,
  // };

  return config;
};