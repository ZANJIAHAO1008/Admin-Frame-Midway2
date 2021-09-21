import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from '../entity/userModel';
import { UserRole } from '../entity/user_role';
import { Role } from '../entity/roleModel';
import { Like, Repository, Not } from 'typeorm';
import { Message } from '../interface/interface';
import { success, error } from '../util/public';
import { RoleService } from '../service/roleService';
import { ResourceService } from '../service/resourceService'
import { postMethod, getMethod } from '../util/methods';
import { generateToken, uuid } from '../util/public'
@Provide()
export class UserService {
    @InjectEntityModel(User)
    userModel: Repository<User>;
    @Inject() //注册角色服务用来查询角色
    roleService: RoleService;//用来查询角色
    @Inject() //注册角色服务用来查询角色
    resourceService: ResourceService;//用来查询角色

    // 注册
    async saveUser(data): Promise<Message> {
        let user = new User();

        let query = await this.userModel.findOne({ username: data.username });
        const fieldWare = ['staffName', 'username', 'password', 'sex', 'phone', 'address'];
        if (!query) {
            //注册账号不存在则新增
            user.enabled = 1;
            user.userState = '0';
            user.staffId = Date.now().toString(); //生成id
            fieldWare.forEach(v => {
                user[v] = data[v];
            })

            let newUser = await this.userModel.save(user); //注册账号信息

            let roles: any[] = await getMethod({ //查询默认的角色
                select: "role",
                model: [Role, "role"],
                where: {
                    grant: 1,
                }
            });

            roles = roles.map(v => {  //过滤默认ID
                return {
                    staffId: newUser.staffId,
                    roleId: v.roleId
                }
            })

            await postMethod({ //插入默认角色
                into: UserRole,
                values: roles
            })

            return success(['注册成功', null])

        } else if (query.enabled == 0) {
            //如果存在但是enabled为0 则改为1
            query.enabled = 1;
            query.userState = '0';
            fieldWare.forEach(v => {
                query[v] = data[v];
            })
            await this.userModel.save(query);
            return success(['注册成功', null])
        } else {
            //如果查询到了存在该账号则无法新增
            return error(['该用户名已存在', null])
        }
    }

    // 查询全部用户
    async queryUser(data): Promise<Message> {

        let queryLength = await this.userModel.find({   //查询总条数
            where: [{
                staffName: Like(`%${data?.staffName ?? ""}%`),
                staffId: data.staffId ? data.staffId : Not('null'),
                enabled: 1,
            }],
            order: {
                id: "ASC"
            },
        });

        let result = await this.userModel.find({
            select: ["id", 'username', 'staffName', 'staffId', 'createTime', 'sex', 'staffName', 'phone', 'address', 'birthDate', 'image', 'userState', 'marks'],
            where: {
                staffName: Like(`%${data?.staffName ?? ""}%`),
                staffId: data.staffId ? data.staffId : Not('null'),
                enabled: 1,
            },
            order: {
                id: "ASC"
            },
            skip: data?.page ? (data.page == 1 ? 0 : (data.pageSize * data.page) - data.pageSize) : 0,
            take: data?.pageSize ?? 10
        });

        return success(['请求成功', {
            list: result,
            total: queryLength.length,
            page: data?.page ? +data?.page : 1,
            pageSize: data?.pageSize ? +data?.pageSize : 10,
        }])
    }

    //查询个人信息
    async getUserInfo(data): Promise<Message> {
        let user = await this.userModel.findOne({ //查询出该用户个人信息
            select: ["id", 'username', 'staffName', 'staffId', 'createTime', 'sex', 'staffName', 'phone', 'address', 'birthDate', 'image', 'userState', 'marks'],
            where: {
                username: data.username,
                enabled: 1
            },
        })

        let roleList = await this.roleService.getRoleList({ staffId: user.staffId }); //用来获用户关联的角色的集合

        let resourceIds = await this.resourceService.getUserRoleResourceIds(roleList); //用来获用户关联的角色的所有资源的ID集合

        let resourceList = await this.resourceService.getUserRoleResource(resourceIds); //获取所有的资源

        user.resourceList = resourceList ?? [];

        return success(['请求成功', user])
    }

    //登陆接口
    async login(data): Promise<Message> {
        let token: any;
        let query = await this.userModel.findOne({ username: data.username, password: data.password, enabled: 1 });
        if (query) { //如果查询到有用户
            if (query.userState == '0') { //如果用户状态是正常
                token = generateToken({
                    Header: {
                        username: query.username
                    },
                    Signature: uuid(),
                    Payload: {
                        expiresIn: 60 * 120 // 生成的token的有效期(秒)
                    }
                });
                return success(['登陆成功', token])
            } else { //如果是冻结
                return error(['您的账号已冻结,请联系管理员', null])
            }
        } else {
            return error(['您输入的用户名或密码不正确，请重试', null])
        }
    }

    async delUser(data): Promise<Message> {  //删除用户  逻辑删除 enabled  0
        let query = await this.userModel.findOne({ id: data.id });
        if (query) {
            query.enabled = 0;
            await this.userModel.save(query);
            return success(['删除成功', null])
        } else {
            return error(['用户不存在', null])
        }
    }

    async changePass(data): Promise<Message> { //修改密码
        let result = await this.userModel.findOne({ staffId: data.staffId, password: data.oldPassword });
        if (result) {
            if (data.oldPassword === data.newPassword) {
                return error(['新旧密码重复,请重新再试', null])
            };
            result.password = data.newPassword;
            await this.userModel.save(result);
            return success(['密码修改成功,请重新登陆', null])
        } else {
            return error(['密码输入错误,请重新再试', null])
        }
    }

    async modifyBaseInfo(data): Promise<Message> {//修改基本信息
        const fieldWare = ['username', 'staffId','sex', 'staffName', 'phone', 'address', 'birthDate', 'image', 'userState', 'marks'];
        let result = await this.userModel.findOne({ staffId: data.staffId });
        if (result) {
            fieldWare.forEach(v => {
                if (data[v]) {
                    result[v] = data[v];
                }
            })
        }
        await this.userModel.save(result);
        return success(['修改成功', null])
    }

}