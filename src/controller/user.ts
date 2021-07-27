import { Controller, Get, Inject, Post, Provide, Body, ALL,Query } from '@midwayjs/decorator';
import { UserService } from '../service/userService'
import { UserInter, Message,UserQuery } from '../interface';


@Provide()
@Controller('/')
export class UserController {
    @Inject('UserService')
    userService: UserService;

    @Get('/user/getAll') //查询全部
    async getAll(@Query(ALL) data:UserQuery): Promise<Message> {
        const result = await this.userService.queryUser(data);
        return result;
    }
    @Get('/user/getUserInfo') //查询个人信息
    async getUserInfo(@Query(ALL) data:Object): Promise<Message> {
        const result = await this.userService.getUserInfo(data);
        return result;
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

    @Post('/user/delUser')  //删除用户  逻辑删除 enabled  0
    async deleteUser(@Body(ALL) data: UserInter) {
        const result = await this.userService.delUser(data);
        return result;
    }


    @Post('/user/changePass')  //修改密码 
    async changePass(@Body(ALL) data: Object):Promise<Message>{
        const result = await this.userService.changePass(data);
        return result;
    }




}