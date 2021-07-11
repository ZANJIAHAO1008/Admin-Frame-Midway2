import { Controller, Get, Inject, Post, Provide, Body, ALL } from '@midwayjs/decorator';
import { UserService } from '../service/userService'
import { UserInter, Message } from '../interface';


@Provide()
@Controller('/')
export class HomeController {
    @Inject('UserService')
    userService: UserService;

    @Get('/user/getAll') //查询全部
    async getAll(): Promise<Message> {
        const user = await this.userService.queryUser();
        return { code: 200, message: '查询成功', data: user, serverTime: new Date() }
    }

    @Post('/user/login') //post登陆
    async getFind(@Body(ALL) data: UserInter): Promise<Message> {
        const result = await this.userService.login(data);
        return result;
    }

    @Post('/user/addUser') //注册账号
    async updateUser(@Body(ALL) data: UserInter) {
        const result = await this.userService.saveUser(data);
        return result;
    }



}