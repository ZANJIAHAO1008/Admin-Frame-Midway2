
import { Controller, Inject, Provide, Get, Body, ALL, Post, Del, Query, Put } from '@midwayjs/decorator';
import { RoleService } from '../service/roleService';
import { addRole, delRole, saveRole,queryRole,relationInter } from '../commonInterface/role'
import { Message } from '../interface'


@Provide()
@Controller('/')
export class RoleController {
    @Inject('RoleService')
    roleService: RoleService;

    @Get('/role/getRole')//查询角色
    async getRole(@Query(ALL)data:Object): Promise<Message> {
        const result = await this.roleService.getRole(data);
        return result;
    }

    @Post('/role/save') //新增角色
    async saveRole(@Body(ALL) data: addRole): Promise<Message> {
        const result = await this.roleService.saveRole(data);
        return result;
    }

    @Put('/role/edit') //修改角色
    async editResource(@Body(ALL) data: saveRole): Promise<Message> {
        const result = await this.roleService.editRole(data);
        return result;
    }

    @Del('/role/delete') //删除角色
    async delResource(@Query(ALL) data: delRole): Promise<Message> {
        const result = await this.roleService.delRole(data);
        return result;
    }
    @Post('/role/relationUser') //新增关联角色
    async relationUser(@Body(ALL) data: relationInter): Promise<Message> {
        const result = await this.roleService.relationUser(data);
        return result;
    }
    @Get('/role/getUserRole')//查询关联角色
    async getUserRole(@Query(ALL) data:queryRole): Promise<Message> {
        const result = await this.roleService.getUserRole(data);
        return result;
    }



}