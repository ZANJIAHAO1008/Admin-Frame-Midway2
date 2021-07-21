import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/userModel';
import { Like, Repository, Not } from 'typeorm';
import { Message } from '../interface';
import { UserUtil } from '../util/user';
@Provide('UserService')
export class UserService {
    @Inject('UserUtil')
    userUtil: UserUtil;
    @InjectEntityModel(User)
    userModel: Repository<User>;

    // 注册
    async saveUser(data): Promise<Message> {
        let user = new User();
        let result = null;
        let query = await this.userModel.findOne({ username: data.username });
        const fieldWare = ['staffName', 'username', 'password', 'sex','phone','address'];
        if (!query) {
            //注册账号不存在则新增
            user.enabled = 1;
            user.staffId = Date.now().toString(); //生成id
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

    // 查询用户
    async queryUser(data): Promise<Message> {

        let queryLength = await this.userModel.find({   //查询总条数
            where: [{
                staffName: Like(`%${data.staffName}%`),
                staffId: data.staffId ? data.staffId : Not('null'),
                enabled: 1,
            }],
            order: {
                id: "ASC"
            },
        });

        let result = await this.userModel.find({
            select: ["id", 'username', 'staffName', 'staffId', 'createTime', 'sex', 'staffName','phone','address'],
            where: {
                staffName: Like(`%${data.staffName}%`),
                staffId: data.staffId ? data.staffId : Not('null'),
                enabled: 1,
            },
            order: {
                id: "ASC"
            },
            skip: data.page == 1 ? 0 : (data.pageSize * data.page) - data.pageSize,
            take: data.pageSize

        });
        return this.userUtil.success(['请求成功', {
            list: result,
            total: queryLength.length,
            page: +data.page,
            pageSize: +data.pageSize,
        }])
    }

    //登陆接口
    async login(data) {
        let token: any;
        let query = await this.userModel.findOne({ username: data.username, password: data.password, enabled: 1 });
        if (query) {
            await this.userUtil.generateToken({
                Header: {
                    username: query.username
                },
                Signature: this.userUtil.uuid(),
                Payload: {
                    expiresIn:  60 // 生成的token的有效期(秒)
                }
            }).then(res => {
                token = res;
            })
            return this.userUtil.success(['登陆成功', token])
        } else {
            return this.userUtil.error(['您输入的用户名或密码不正确，请重试', null])
        }
    }

    async delUser(data) {  //删除用户  逻辑删除 enabled  0
        let query = await this.userModel.findOne({ id: data.id });
        query.enabled = 0;
        await this.userModel.save(query);
        return this.userUtil.success(['删除成功', null])
    }

}