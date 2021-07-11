import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/userModel';
import { Repository } from 'typeorm';
import { Message } from '../interface';
import { UserUtil } from '../util/user';
// const uuidv3 = require('uuid/v3');
// const jwt = require('jsonwebtoken')
@Provide('UserService')
export class UserService {
    @Inject('UserUtil')
    userUtil: UserUtil;
    @InjectEntityModel(User)
    userModel: Repository<User>;

    // save
    async saveUser(data): Promise<Message> {
        let user = new User();
        let result = null;
        let query = await this.userModel.findOne({ username: data.username });
        const fieldWare = ['staffName', 'username', 'password', 'sex'];
        if (!query) {
            //注册账号不存在则新增
            user.enabled = 1;
            fieldWare.forEach(v => {
                user[v] = data[v];
            })
            result = await this.userModel.save(user);
            return this.userUtil.success(['注册成功', result])
        } else if (query.enabled == 0) {
            //如果存在但是enabled为0 则改为1
            query.enabled = 1;
            fieldWare.forEach(v => {
                query[v] = data[v];
            })
            result = await this.userModel.save(query);
            return this.userUtil.success(['注册成功', result])
        } else {
            //如果查询到了存在该账号则无法新增
            return this.userUtil.error(['该用户名已存在', null])
        }
    }

    // query
    async queryUser() {
        let userResult = await this.userModel.find({
            where: [{ enabled: 1 }],
            order: {
                id: "DESC"
            }
        });

        return userResult;
    }

    //登陆接口
    async login(data) {
        let token: any;
        let query = await this.userModel.findOne({ username: data.username, password: data.password, enabled: 1 });
        if (query) {
            await this.userUtil.generateToken({
                Header: {
                    username: query.username,
                    password: query.password
                },
                Signature: "admin",
                Payload: {
                    expiresIn: 60 * 60// 生成的token的有效期
                }
            }).then(res => {
                token = res;
            })
            return this.userUtil.success(['登陆成功', token])
        } else {
            return this.userUtil.error(['您输入的用户名或密码不正确，请重试', null])
        }
    }

}