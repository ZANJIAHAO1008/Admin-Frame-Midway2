import { Controller, Get, Inject, Post, Provide, Body, ALL, Query, Validate } from '@midwayjs/decorator';
import { UserService } from '../service/userService'
import { Message, UserQuery } from '../interface/interface';
import { LoginDTO, RegisterDTO, DelUserDTO, ChangePassDTO, ChangeUserInfoDTO } from '../dto/user';
import { Context } from 'egg';
import { verifyToken } from '../util/public'
@Provide()
@Controller('/')
export class UserController {
    @Inject('UserService')
    userService: UserService;
    @Inject()
    ctx: Context;
    @Get('/user/getAll') //查询全部
    async getAll(@Query(ALL) data: UserQuery): Promise<Message> {
        const result = await this.userService.queryUser(data);
        return result;
    }
    @Get('/user/getUserInfo') //查询个人信息
    async getUserInfo(): Promise<Message> {
        const data: Object = verifyToken(this.ctx.header.authorization);
        const result = await this.userService.getUserInfo(data);
        return result;
    }

    @Validate()
    @Post('/user/login', { middleware: ['logMiddleware'] }) //post登陆
    async getFind(@Body(ALL) data: LoginDTO): Promise<Message> {
        const result = await this.userService.login(data);
        return result;
    }

    @Validate()
    @Post('/user/addUser', { middleware: ['logMiddleware'] }) //注册账号
    async updateUser(@Body(ALL) data: RegisterDTO): Promise<Message> {
        const result = await this.userService.saveUser(data);
        return result;
    }

    @Validate()
    @Post('/user/delUser')  //删除用户  逻辑删除 enabled  0
    async deleteUser(@Body(ALL) data: DelUserDTO): Promise<Message> {
        const result = await this.userService.delUser(data);
        return result;
    }

    @Validate()
    @Post('/user/changePass')  //修改密码 
    async changePass(@Body(ALL) data: ChangePassDTO): Promise<Message> {
        const result = await this.userService.changePass(data);
        return result;
    }

    @Validate()
    @Post('/user/modifyBaseInfo')  //修改基本信息
    async modifyBaseInfo(@Body(ALL) data: ChangeUserInfoDTO): Promise<Message> {
        const result = await this.userService.modifyBaseInfo(data);
        return result;
    }

}